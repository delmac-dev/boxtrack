"use client";

import AddForm from "@/components/common/add-form";
import Group from "@/components/common/group";
import Home from "@/components/common/home";
import Stats from "@/components/common/stats";
import Tab from "@/components/common/tab";
import TabButton from "@/components/common/tab-button";
import Carton from "@/components/icons/carton";
import { useGetActiveCollections } from "@/lib/query-hooks";
import * as Dialog from "@radix-ui/react-dialog";
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
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-dark/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 bg-secondary px-4 py-10 duration-200 sm:rounded-xl flex flex-col items-center focus:outline-none border-light border-2 dialog-content">
            <Dialog.Close className="absolute -right-16 -top-16 size-10 rounded-full flex-center bg-primary/90 transition-colors hover:bg-primary focus:outline-none focus:ring-2 focus:ring-light focus:ring-offset-2 disabled:pointer-events-none">
              <X className="size-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
            <Dialog.Title className="text-6xl font-extrabold text-tertiary mb-10">
              NEW GROUP
            </Dialog.Title>
            <Dialog.Description className="bg-primary/40 size-24 flex-center rounded-tl-full rounded-tr-full rounded-bl-full border-primary border-4 rotate-45 mb-10 shadow-inner">
              <Carton className="-rotate-45 size-14"/>
            </Dialog.Description>
            <AddForm callback={() => setOpen(false)} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Tabs>
  );
}
