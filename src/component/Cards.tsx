import styled, { css } from "styled-components";
import { useState } from "react";
import { Button } from './Button';

const CardContainer = styled.section`
    width: 200px;
    height: 150px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 4px 4px #aeaeae;
    cursor: pointer;
    position: relative;
    padding: 8px 8px;
`;

const CardButtons = styled.div`
    position: absolute;
    bottom: 0px;
`;

export const Cards = ({ note, id, onViewClick, onDeleteClick }) => {
    const [style, setStyle] = useState({ display: 'none' });
    return (
        <CardContainer onMouseEnter={e => {
            setStyle({
                display: 'flex',
                width: '100%',
                gap: '10px',
                justifyContent: 'center'
            });
        }}
            onMouseLeave={e => {
                setStyle({ display: 'none' })
            }}>
            {note.textFormat}
            <CardButtons style={style}>
                <Button size={"small"} buttonLabel={"View"} type={"primary"} handleClick={() => onViewClick(note, id)} />
                <Button size={"small"} buttonLabel={"Delete"} type={"danger"} handleClick={() => onDeleteClick(id)} />
            </CardButtons>
        </CardContainer>
    )
}