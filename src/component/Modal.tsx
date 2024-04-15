import React from 'react'
import {createPortal} from 'react-dom';
import styled from "styled-components";
import { Button } from './Button';

const ModalComponent = styled.section`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
`;

const ModalContainer = styled.div`
    background-color: #fefffe;
    padding: 10px;
    position: relative;
    width: 100%;
    border-radius: 8px;
`;

const ModalClose = styled(Button)`
`;

const ModalCloseWrapper = styled.div`
    position: absolute;
    right: 12px;
    top: 8px;
`;

const ModalBody = styled.div`
    margin: 80px 0px 0px 0px;
`;

export default function Modal({isOpen, onClose, children}) {
   if(!isOpen)return null;
 return createPortal(
   <ModalComponent>
       <ModalContainer>
           <ModalBody>
               {children}
           </ModalBody>
           <ModalCloseWrapper>
            <ModalClose type={"danger"} buttonLabel={"Close"} handleClick={onClose} />
           </ModalCloseWrapper>
       </ModalContainer>
    
   </ModalComponent>
   , document.getElementById('modal') // this will let react-dom know that we want to render this modal outside the current React tree
 )
}