"use client";

import AddForm from "@/components/common/add-form";
import Group from "@/components/common/group";
import Home from "@/components/common/home";
import Stats from "@/components/common/stats";
import Tab from "@/components/common/tab";
import TabButton from "@/components/common/tab-button";
import { useGetActiveCollections } from "@/lib/query-hooks";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@radix-ui/react-dialog";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { HomeIcon, LogOut, Plus, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function BoxTrack() {
  const { data: tabs, isLoading, isError } = useGetActiveCollections();
  const [ open, setOpen ] = useState(false);

  return (
    <Tabs defaultValue="home" className="w-full min-h-screen flex flex-col">
      <TabsList className="w-full h-12 flex px-2 justify-between bg-primary items-end">
        {/* left panel */}
        <div className="relative isolate h-10 flex">
          <Tab value="home" onLeft icon={HomeIcon} />
          {tabs && tabs.map(({ label }, index) => <Tab key={index} value={label} />)}
          <TabButton icon={Plus} fnx={() => setOpen(true)} />
        </div>

        {/* right panel */}
        <div className="relative isolate h-10 flex">
          <TabButton icon={LogOut} fnx={() => signOut({redirectTo: "/login"})} />
          <Tab value="stats" onRight />
        </div>
      </TabsList>

      {/* content */}
      <Home />
      {tabs && tabs.map((data, index) => <Group key={index} { ...data } />)}
      <Stats />

      {/* add group dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-light/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogContent className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-secondary p-6 py-20 shadow-lg duration-200 sm:rounded-xl dialog-animation flex flex-col items-center space-y-6 focus:outline-none border-none">
            <DialogTitle className="text-4xl font-extrabold text-dark">
              NEW GROUP
            </DialogTitle>
            <DialogDescription>Create an active group</DialogDescription>
            <AddForm callback={() => setOpen(false)} />
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </Tabs>
  );
}
