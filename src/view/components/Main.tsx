import { usePanelContext } from "../../app/hooks/usePanelContext";

export const Main = ({ children }: { children: React.ReactNode }) => {
    const { hiddenPanel } = usePanelContext()
    return (
        <main className={`relative ${hiddenPanel ? 'ml-0' : 'ml-96'} mt-28 min-h-calc-main px-9 py-10`}>
            {children}
        </main>
    );
}