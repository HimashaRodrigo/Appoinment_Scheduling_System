import { styled } from "styled-components";

export const Container = styled.div`
  width: 60%;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 2px 2px 2px #000000ad;
  background-color: #fff;
  margin: 5%;
  padding: 2%;
  justify-content: center;
  align-items: center;
`;

export const NewJob = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  align-items: center;
`
export const AddJobBar = styled.div`
  &{
    display: flex;
  justify-content: space-between;
  width: 15rem;
  height:1rem;
  align-items: center;
  border-radius: 5rem;
  background-color: #000;
  color: #fff;
  padding: 1.5%;
  }
  &:hover{
    cursor: pointer;
  }
`
export const Icon1 = styled.div`
  text-align: center;
  width: 30%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Text = styled.div`
  text-align: center;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`
export const JobDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const Table = styled.table`
  color: #000;
  margin: 3%;
  border-radius: 10px;
  width: 80%;
  overflow-y: scroll;
  @media screen and (max-width: 769px) {
    /* border:none; */
  }
`;
export const Tr = styled.tr`
  border: 2px solid #fff;
  text-align: center;
  height: 30px;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 769px) {
    font-size: 90%;

    /* border:none;
       padding:10px; */
  }
`;

export const Th = styled.th`
  border-bottom: 2px solid #000;
  width: 25%;
  @media screen and (max-width: 769px) {
    margin-bottom: 10px;
    padding-bottom: 10px;
    &:last-child {
    }
  }
`;
export const Td = styled.td`
  width: 100%;
  font-size: 14px;
  @media screen and (max-width: 769px) {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: none;
  }
`;
export const Icon = styled.div`
  & {
    color: #ffbf00;
  }
  &:hover {
    cursor: pointer;
  }
`;
