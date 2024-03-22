const Button = (props) => {
    return (
        <button onClick={props.onClick} className={"p-3 w-[8rem] rounded-full font-medium text-white flex gap-2 justify-center items-center"} style={{width:props.width, backgroundColor:props.bgColor?props.bgColor:"orange", color:props.textColor?props.textColor:"white" }}>
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