import styled from 'styled-components'
import { Sidebar } from "../component/NotesList";
import { Dashboard } from '../component/Dashboard';

const Main = styled.main`
    display: flex;
    width: 100%;
`;

export const Landing = () => {
    return (
        <Main>
            <Sidebar />
            <Dashboard />
        </Main>
    )
}