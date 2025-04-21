const Footer = () => {
    const year = new Date().getFullYear();
    return (<footer className="flex flex-col py-2 px-4 w-full text-center">
        <p className="uppercase font-medium">
            Copyright © {year} Nadun Malwenna.
        </p>
    </footer>)
}

export default Footer