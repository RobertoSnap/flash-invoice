import React from 'react';
import styled, { keyframes } from "styled-components";

interface Props { }
const rotate = keyframes`
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
        `;

const RotateDiv = styled.div`
        display: inline-block;
        animation: ${rotate} 2s linear infinite;
        padding: 2rem 1rem;
        font-size: 1.2rem;
        `;


export const Rotate: React.FC<Props> = ({ children }) => {

    return (
        <RotateDiv className="gsdg">{children}</RotateDiv>
    )
}