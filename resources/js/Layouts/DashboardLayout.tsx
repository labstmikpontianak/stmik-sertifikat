interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <main>
            <h1>Hello World</h1>
            <section>{children}</section>
        </main>
    );
};

export default DashboardLayout;
