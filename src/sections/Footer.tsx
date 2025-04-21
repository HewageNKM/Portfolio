const Footer = () => {
    const year = new Date().getFullYear();
    return (<footer className="flex flex-col w-full text-center">
        <div>
            Copyright © {year} Nadun Malwenna
        </div>
    </footer>)
}

export default Footer