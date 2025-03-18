function DefaultLayout({ children }) {
    return (
        <div>
            <div>
                <div className="content bg-slate-100"> {children} </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
