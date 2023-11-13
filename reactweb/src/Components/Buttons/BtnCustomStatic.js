import style from './BtnCustomStatic.css';

const BtnCustomStatic = ({label, customStyle, onClick}) =>{

    return(
        <button onClick={onClick} className="btnCustomStatic"  style={customStyle}>{label}</button>
    )
}

export default BtnCustomStatic;