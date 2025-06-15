# Animation and Transition Testing Guide

This guide outlines the manual testing steps for the recent improvements to rendering and transitions.

## I. General Checks (All Browsers, Normal and Reduced Motion Modes)

- **Reduced Motion**: Test with your operating system's "reduce motion" accessibility setting enabled and disabled. Animations should be minimal or disabled when "reduce motion" is on.

## II. Subtle Feedback Animations

1.  **Buttons (`src/components/ui/button.tsx`)**:
    *   Hover over buttons: Expect a subtle scale-up and brightness increase.
    *   Click/tap buttons: Expect a subtle scale-down during press.
    *   Tab to buttons (keyboard navigation): Expect a visible focus ring (e.g., blue shadow).
    *   Verify in normal and reduced motion modes.

2.  **Inputs (`src/components/ui/input.tsx`)**:
    *   Focus on input fields: Expect an animated border color change and/or subtle shadow.
    *   Verify in normal and reduced motion modes.

3.  **Cards (`src/components/ui/card.tsx`)**:
    *   If cards are interactive (e.g., clickable links), hover over them: Expect a gentle scale-up and/or shadow change.
    *   Tab to interactive cards: Expect a similar focus effect.
    *   Verify on pages where cards are used (e.g., dashboard, case lists).
    *   Verify in normal and reduced motion modes.

4.  **Checkboxes (`src/components/ui/checkbox.tsx`)**:
    *   Hover over checkboxes: Expect a subtle border animation or scale.
    *   Focus on checkboxes: Expect a clear focus ring.
    *   Verify in normal and reduced motion modes.

## III. Page Transitions (`src/app/App.tsx`)

1.  **Navigation**:
    *   Navigate between different main pages of the application (e.g., Home/Landing -> Dashboard, Dashboard -> Cases, Cases -> Case Detail, Account, Auth page).
    *   Expect a smooth slide-and-fade transition (or just fade for reduced motion). The outgoing page should animate out before the new page animates in.
2.  **Consistency**: Ensure the transition feels consistent across different routes.

## IV. Performance and Visuals

1.  **Glassmorphic Entrance (`src/lib/motion.ts`)**:
    *   If this animation is used on any specific modals or entry elements (check example pages), ensure the blur effect is present but not overly performance-heavy (should be `5px` blur).
    *   Verify in normal and reduced motion modes.

2.  **General Smoothness**:
    *   Throughout testing, watch for any animation jank, stuttering, or visual glitches.
    *   Pay attention to pages with multiple animated elements.

## V. Specific Components to Check

*   Buttons on various pages
*   Input fields in forms (e.g., login, case creation)
*   Cards displaying case information or other summaries
*   Checkboxes in forms or settings
*   Page navigation through main links/menus
*   Any modals or components that use `glassmorphicEntrance` (primarily example/doc pages).
