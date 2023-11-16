import style from './BtnCustom.css';

const BtnCustom = ({label, customStyle, onClick}) =>{

    return(
        <button onClick={onClick} className="btnCustom" style={customStyle}>{label}</button>
    )
}

export default BtnCustom;