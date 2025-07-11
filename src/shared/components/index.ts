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
// LEGACY COMPONENTS (for backward compatibility)
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
// export { Chart } from "./chart" // Chart component is not ready
export { default as LoadingScreen } from "./loading-screen"
export { LoadingSpinner } from "./loading-spinner"
export { OfflineBanner } from "./OfflineBanner"

// ────────────────────────────────────────────────────────────────────────────────
// TOAST COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

export { Toaster } from "./toaster"
export { useToast } from "@/shared/hooks/use-toast"
export { toast } from "sonner"

// Shared UI Components
export { default as NotFound } from './NotFound';

// Background Components
export { default as UnifiedBackground } from './UnifiedBackground';

// Layout components
export * from './layout'
export * from './separator'
export * from './scroll-area'
export * from './resizable'

// Content components
export * from './card'
export * from './sheet'
export * from './dialog'
export * from './popover'
export * from './hover-card'
export * from './tabs'
export * from './accordion'
export * from './collapsible'
export * from './aspect-ratio'

// Data components
export * from './table'
export * from './chart'

// Interactive components  
export * from './command'
export * from './context-menu'
export * from './dropdown-menu'
export * from './menubar'
export * from './navigation-menu'
export * from './breadcrumb'
export * from './pagination'

// Form components - Unified System
export * from './form'
export * from './button'
export * from './input'
export * from './textarea'
export * from './select'
export * from './checkbox'
export * from './radio-group'
export * from './switch'
export * from './slider'
export * from './label'

// Feedback components
export * from './alert'
export * from './alert-dialog'
export * from './toast'
export * from './toaster'
export * from './sonner'
export * from './progress'
export * from './skeleton'
export * from './loading-spinner'
export * from './loading-screen'

// Utility components
export * from './badge'
export * from './avatar'
export * from './tooltip'
export * from './toggle'
export * from './toggle-group'
export * from './input-otp'

// Specialized components
export * from './carousel'
export * from './bento-card'
export * from './bento-container'
export * from './NotFound'
export * from './OfflineBanner'
export * from './page-header'
export * from './settings-card'
export * from './animation'
export * from './UnifiedBackground'
export * from './form-group'
export * from './form-progress'

// Medical/Clinical components
