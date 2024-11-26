import Header from "@/components/common/header";


export default function Layout({children}: {children: React.ReactNode;}) {
    return (
        <>
            <Header />
            <main className="w-full flex justify-center py-8">
                {children}
            </main>
        </>
    )
}