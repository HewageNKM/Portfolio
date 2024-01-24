const Button = (props) => {
    return (
        <button className={"bg-orange-400 p-4 w-auto rounded-full font-medium text-white flex gap-2 justify-center items-center hover:bg-orange-500"}>
            {props.name}
            {props.imgURL && <img
                src={props.imgURL}
                alt='arrowRightIcon'
                width="25"
            />}
        </button>
    )
}
export default Button;