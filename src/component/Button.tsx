import styled, { css } from "styled-components";

const ButtonComponent = styled.button`
    color: ${(props) => ((props.type !== "primary" && props.type !== "danger" && props.type !=="success") ? '#000000;' : '#ffffff;')};
    border: none;
    width: ${(props) => ((props.size === "small") ? '60px;' : '160px;')};
    height: ${(props) => ((props.size === "small") ? '30px;' : '60px;')};
    cursor: pointer;
    box-shadow: ${(props) => ((props.type !== "primary" && props.type !== "danger" && props.type !=="success") ? '4px 4px #d9d9d9;': '4px 4px #373737;')};
    margin: 8px 0px;
    background-color:  ${(props) => props.type === "primary"? '#448EF7': props.type === "danger" ? '#EC5B56' : props.type === "success" ? '#53A551;' : '#eeeeee;'};

`;

export const Button = (props) => {
    const { buttonLabel, type, handleClick, size="large", style } = props;
    return (
        <ButtonComponent  style={style} type={type} onClick={handleClick} size={size}>
            {buttonLabel}
        </ButtonComponent>
    )
}