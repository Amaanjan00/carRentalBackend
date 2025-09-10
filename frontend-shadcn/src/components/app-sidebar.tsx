import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Home, Car, ReceiptText, User, Receipt } from "lucide-react"

export function AppSidebar() {

    const items = [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "Cars",
            url: "#",
            icon: Car,
        },
        {
            title: "Contracts",
            url: "#",
            icon: ReceiptText,
        },
        {
            title: "Customers",
            url: "#",
            icon: User,
        },
        {
            title: "Bills Received",
            url: "#",
            icon: Receipt,
        },
    ]


    const forms = [
        {
            title: "Add New Car",
            url: "/add-new-car",
            icon: ReceiptText,
        },
        {
            title: "Contract Form",
            url: "/contract-form",
            icon: ReceiptText,
        },
        {
            title: "Bills Receiving Form",
            url: "/bills-receiving-form",
            icon: ReceiptText,
        },
        {
            title: "Fine Entry Form",
            url: "/fine-entry-form",
            icon: ReceiptText,
        },
        {
            title: "Contract Ending Form",
            url: "/contract-ending-form",
            icon: ReceiptText,
        },
        {
            title: "Salik Entry Form",
            url: "/salik-entry-form",
            icon: ReceiptText,
        },
    ]



  return (
    <Sidebar>

        <SidebarHeader className="flex items-center justify-center p-4">
            <img className={`w-50`} src="/wollogo.png" alt="" />
        </SidebarHeader>

        <SidebarContent>

            <SidebarGroup>

                <SidebarGroupLabel>Headers</SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>

            </SidebarGroup>


            <SidebarGroup>

                <SidebarGroupLabel>Forms</SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu>
                    {forms.map((form) => (
                        <SidebarMenuItem key={form.title}>
                        <SidebarMenuButton asChild>
                            <a href={form.url}>
                            <form.icon />
                            <span>{form.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>

            </SidebarGroup>

        </SidebarContent>

        <SidebarFooter>Footer</SidebarFooter>

    </Sidebar>
  )
}