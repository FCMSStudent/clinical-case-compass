#!/bin/bash

# Phase 4 Branch Migration Utility Script
# Helps audit, categorize, and migrate existing branches to new strategy

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Utility functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository. Please run this script from the project root."
        exit 1
    fi
}

# Audit existing branches
audit_branches() {
    log_info "Auditing existing branches..."
    
    echo "=== BRANCH AUDIT REPORT ===" > branch_audit_report.md
    echo "Generated on: $(date)" >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    
    # Get all remote branches
    local remote_branches=$(git branch -r | grep -v 'HEAD' | sed 's/origin\///' | sort)
    local total_branches=$(echo "$remote_branches" | wc -l)
    
    echo "## Summary" >> branch_audit_report.md
    echo "- Total branches found: $total_branches" >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    
    # Categorize branches
    local feature_branches=$(echo "$remote_branches" | grep -E '^(feat|feature)' || true)
    local refactor_branches=$(echo "$remote_branches" | grep -E '^(refactor|ref)' || true)
    local fix_branches=$(echo "$remote_branches" | grep -E '^(fix|hotfix|bug)' || true)
    local codex_branches=$(echo "$remote_branches" | grep -E '^codex' || true)
    local cursor_branches=$(echo "$remote_branches" | grep -E '^cursor' || true)
    local misc_branches=$(echo "$remote_branches" | grep -vE '^(feat|feature|refactor|ref|fix|hotfix|bug|codex|cursor|main|develop)' || true)
    
    # Generate categorized report
    echo "## Branch Categories" >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    
    echo "### Feature Branches ($(echo "$feature_branches" | wc -l))" >> branch_audit_report.md
    if [ -n "$feature_branches" ]; then
        echo '```' >> branch_audit_report.md
        echo "$feature_branches" >> branch_audit_report.md
        echo '```' >> branch_audit_report.md
    else
        echo "None found" >> branch_audit_report.md
    fi
    echo "" >> branch_audit_report.md
    
    echo "### Refactor Branches ($(echo "$refactor_branches" | wc -l))" >> branch_audit_report.md
    if [ -n "$refactor_branches" ]; then
        echo '```' >> branch_audit_report.md
        echo "$refactor_branches" >> branch_audit_report.md
        echo '```' >> branch_audit_report.md
    else
        echo "None found" >> branch_audit_report.md
    fi
    echo "" >> branch_audit_report.md
    
    echo "### Fix/Hotfix Branches ($(echo "$fix_branches" | wc -l))" >> branch_audit_report.md
    if [ -n "$fix_branches" ]; then
        echo '```' >> branch_audit_report.md
        echo "$fix_branches" >> branch_audit_report.md
        echo '```' >> branch_audit_report.md
    else
        echo "None found" >> branch_audit_report.md
    fi
    echo "" >> branch_audit_report.md
    
    echo "### Codex Branches ($(echo "$codex_branches" | wc -l))" >> branch_audit_report.md
    if [ -n "$codex_branches" ]; then
        echo '```' >> branch_audit_report.md
        echo "$codex_branches" >> branch_audit_report.md
        echo '```' >> branch_audit_report.md
    else
        echo "None found" >> branch_audit_report.md
    fi
    echo "" >> branch_audit_report.md
    
    echo "### Cursor Branches ($(echo "$cursor_branches" | wc -l))" >> branch_audit_report.md
    if [ -n "$cursor_branches" ]; then
        echo '```' >> branch_audit_report.md
        echo "$cursor_branches" >> branch_audit_report.md
        echo '```' >> branch_audit_report.md
    else
        echo "None found" >> branch_audit_report.md
    fi
    echo "" >> branch_audit_report.md
    
    echo "### Miscellaneous Branches ($(echo "$misc_branches" | wc -l))" >> branch_audit_report.md
    if [ -n "$misc_branches" ]; then
        echo '```' >> branch_audit_report.md
        echo "$misc_branches" >> branch_audit_report.md
        echo '```' >> branch_audit_report.md
    else
        echo "None found" >> branch_audit_report.md
    fi
    echo "" >> branch_audit_report.md
    
    # Add migration recommendations
    echo "## Migration Recommendations" >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    echo "### Action Required" >> branch_audit_report.md
    echo "1. **Review active branches**: Check which branches have recent commits" >> branch_audit_report.md
    echo "2. **Identify mergeable branches**: Look for completed features ready for develop" >> branch_audit_report.md
    echo "3. **Archive obsolete branches**: Remove or archive old/completed work" >> branch_audit_report.md
    echo "4. **Migrate active work**: Move ongoing work to new branch structure" >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    
    log_success "Branch audit complete. Report saved to: branch_audit_report.md"
}

# Check branch activity (last commit date)
check_branch_activity() {
    log_info "Analyzing branch activity..."
    
    echo "## Branch Activity Analysis" >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    echo "### Recent Activity (Last 30 days)" >> branch_audit_report.md
    echo '```' >> branch_audit_report.md
    
    # Get branches with activity in last 30 days
    git for-each-ref --format='%(refname:short) %(committerdate)' refs/remotes/origin | \
        while read branch date; do
            if [[ $(date -d "$date" +%s) -gt $(date -d "30 days ago" +%s) ]]; then
                echo "$branch - $date"
            fi
        done | head -20 >> branch_audit_report.md
    
    echo '```' >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    
    echo "### Stale Branches (No activity in 90+ days)" >> branch_audit_report.md
    echo '```' >> branch_audit_report.md
    
    # Get stale branches
    git for-each-ref --format='%(refname:short) %(committerdate)' refs/remotes/origin | \
        while read branch date; do
            if [[ $(date -d "$date" +%s) -lt $(date -d "90 days ago" +%s) ]]; then
                echo "$branch - $date"
            fi
        done | head -20 >> branch_audit_report.md
    
    echo '```' >> branch_audit_report.md
    echo "" >> branch_audit_report.md
    
    log_success "Branch activity analysis complete"
}

# Verify new branch structure
verify_structure() {
    log_info "Verifying new branch structure..."
    
    local required_branches=("develop" "feature/auth-enhancement" "feature/case-management" "feature/design-system" "refactor/component-consolidation" "refactor/design-system-cleanup" "refactor/architecture-reorganization" "hotfix/template")
    local missing_branches=()
    
    for branch in "${required_branches[@]}"; do
        if ! git show-ref --verify --quiet "refs/heads/$branch"; then
            missing_branches+=("$branch")
        fi
    done
    
    if [ ${#missing_branches[@]} -eq 0 ]; then
        log_success "All required branches are present"
        echo ""
        echo "✅ Current branch structure:"
        git branch | grep -E "(develop|feature/|refactor/|hotfix/)" | sort
    else
        log_warning "Missing branches: ${missing_branches[*]}"
        return 1
    fi
}

# Create migration plan
create_migration_plan() {
    log_info "Creating migration plan..."
    
    cat > MIGRATION_PLAN.md << 'EOF'
# Branch Migration Plan

## Phase 1: Preparation ✅
- [x] Create new branch structure
- [x] Document branch strategy
- [x] Audit existing branches

## Phase 2: Assessment
- [ ] Review branch audit report
- [ ] Identify active vs. stale branches
- [ ] Categorize branches by merge readiness
- [ ] Plan migration timeline

## Phase 3: Migration Execution

### Step 1: Clean Merge Ready Branches
```bash
# Example for completed features
git checkout develop
git merge --no-ff origin/feat/completed-feature
git push origin develop
git push origin --delete feat/completed-feature
```

### Step 2: Migrate Active Work
```bash
# Example for ongoing work
git checkout -b feature/migrated-work origin/old-branch-name
git push origin feature/migrated-work
# Update any open PRs to point to new branch
```

### Step 3: Archive Obsolete Branches
```bash
# Create archive tags for historical reference
git tag archive/old-branch-name origin/old-branch-name
git push origin --delete old-branch-name
```

## Phase 4: Cleanup
- [ ] Update CI/CD configurations
- [ ] Set branch protection rules
- [ ] Update documentation
- [ ] Notify team of new workflow

## Rollback Plan
- Maintain current main/develop state
- Document all changes made
- Keep audit report for reference
- Test new workflow with small changes first
EOF

    log_success "Migration plan created: MIGRATION_PLAN.md"
}

# Main execution
main() {
    echo "🌿 Phase 4: Branch Strategy Cleanup Utility"
    echo "==========================================="
    echo ""
    
    check_git_repo
    
    case "${1:-audit}" in
        "audit")
            audit_branches
            check_branch_activity
            ;;
        "verify")
            verify_structure
            ;;
        "plan")
            create_migration_plan
            ;;
        "full")
            audit_branches
            check_branch_activity
            verify_structure
            create_migration_plan
            ;;
        "help")
            echo "Usage: $0 [command]"
            echo ""
            echo "Commands:"
            echo "  audit    - Audit existing branches (default)"
            echo "  verify   - Verify new branch structure"
            echo "  plan     - Create migration plan"
            echo "  full     - Run all commands"
            echo "  help     - Show this help"
            ;;
        *)
            log_error "Unknown command: $1"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
    
    echo ""
    log_success "Branch strategy cleanup utility completed"
}

# Execute main function with all arguments
main "$@"