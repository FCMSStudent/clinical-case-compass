
// ────────────────────────────────────────────────────────────────────────────────
// CORE COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export { Button, buttonVariants } from "./button"
export { Input } from "./input"

// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED LAYOUT SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

export {
  // Core layout components
  Container,
  Flex,
  Grid,
  Section,
  
  // Card components (unified)
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  
  // Bento Grid (convenience exports for backward compatibility)
  BentoContainer,
  BentoCard,
  
  // Utilities
  Spacer,
  Divider,
} from "./unified-layout"

// Type exports
export type {
  ContainerProps,
  FlexProps,
  GridProps,
  CardProps,
  SectionProps,
  LayoutVariant,
  FlexVariant,
  GridVariant,
  BentoLayout,
  CardVariant,
} from "./unified-layout"

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export {
  AnimatedDiv,
  StaggeredContainer,
  StaggeredItem,
  GlassyHover,
  Floating,
  PulseGlow,
  MedicalPulse,
} from "./animation"

// ────────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export { Toggle, toggleVariants } from "./toggle"
export { ToggleGroup, ToggleGroupItem } from "./toggle-group"
export { Switch } from "./switch"
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
export { Textarea } from "./textarea"
export { Label } from "./label"
export { Checkbox } from "./checkbox"
export { RadioGroup, RadioGroupItem } from "./radio-group"
export { Slider } from "./slider"
export { Progress } from "./progress"
export { Badge, badgeVariants } from "./badge"
export { Avatar, AvatarFallback, AvatarImage } from "./avatar"
export { Alert, AlertDescription, AlertTitle } from "./alert"
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog"
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet"
export { Popover, PopoverContent, PopoverTrigger } from "./popover"
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
export { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"
export { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./menubar"
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./navigation-menu"
export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb"
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "./command"
export { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "./context-menu"
export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./dropdown-menu"
export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table"
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"
export { Separator } from "./separator"
export { Skeleton } from "./skeleton"
export { AspectRatio } from "./aspect-ratio"
export { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./resizable"
export { ScrollArea, ScrollBar } from "./scroll-area"
export { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination"
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useFormField } from "./form"
export { FormGroup } from "./form-group"
export { FormProgress } from "./form-progress"
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./input-otp"
export { PageHeader } from "./page-header"
export { SettingsCard } from "./settings-card"
export { RecentCasesCarousel } from "./recent-cases-carousel"
export { AutosaveIndicator } from "./autosave-indicator"
export { AvatarUpload } from "./avatar-upload"
export { ErrorSummary } from "./ErrorSummary"
export { OfflineBanner } from "./OfflineBanner"

// ────────────────────────────────────────────────────────────────────────────────
// DEFAULT EXPORTS (converted to named exports)
// ────────────────────────────────────────────────────────────────────────────────

export { default as LoadingScreen } from "./loading-screen"
export { default as DashboardSkeleton } from "./dashboard-skeleton"
export { default as NotFound } from './NotFound'
export { default as UnifiedBackground } from './UnifiedBackground'

// ────────────────────────────────────────────────────────────────────────────────
// TOAST COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export { Toaster } from "./toaster"
export { useToast } from "@/shared/hooks/use-toast"
export { toast } from "sonner"

// ────────────────────────────────────────────────────────────────────────────────
// LOADING COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export { LoadingSpinner } from "./loading-spinner"

// ────────────────────────────────────────────────────────────────────────────────
// SPECIALIZED COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export { BentoCard } from './bento-card'
export { BentoContainer } from './bento-container'

// Medical/Clinical components
export { BodyDiagramHeader } from './components/BodyDiagramHeader'
export { BodyDiagramHint } from './components/BodyDiagramHint'
export { BodyDiagramTooltip } from './components/BodyDiagramTooltip'
export { BodyPartButton } from './components/BodyPartButton'
export type { BodyPartSelection } from './types/bodyPartTypes'
