interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <main>
            <header className="px-8 py-8 flex justify-between items-center">
                {/* Logo and Title */}
                <div className="flex space-x-4 items-center">
                    <img
                        src="/assets/images/logo.png"
                        alt="Logo"
                        className="w-16 -mt-2"
                    />
                    <h1 className="font-bold text-2xl">STMIK Pontianak</h1>
                </div>
            </header>
            <section>{children}</section>
        </main>
    );
};

export default DashboardLayout;
