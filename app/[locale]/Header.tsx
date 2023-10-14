"use client"

import { Container } from "@radix-ui/themes"
import styled from "styled-components"


const HeaderContainer = styled.div`
    height:64px;
`

const Header = () => {
    return (
        <HeaderContainer>
            <Container>
                header
            </Container>
        </HeaderContainer>
    )
}
export default Header