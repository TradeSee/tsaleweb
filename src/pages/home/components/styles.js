import styled from "styled-components";

export const Container = styled.div`
  background-color: #e9edf8;
  display: flex;
`;
export const CardBackgr = styled.div`
  background-color: #e9edf8;
  display: flex;
  width: 100%;
  padding: 20px 30px 20px 30px;
  margin-left: 15px;
  margin-top: 10px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  height: 320px;
  .textRespon {
    @media only screen and (max-width: 1500px) {
      display: -webkit-box;
      -webkit-line-clamp: 2; /* Número máximo de linhas */
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
`;
export const ContainerSearchList = styled.div`
  width: 100%;
  margin-top: 5px;
  padding: 12px 10px 12px 15px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #dce1ee;
  }
`;
export const CardIcon = styled.div`
  width: 65px;
  height: 65px;
  background-color: ${({ theme }) => theme.colors.main[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
export const ContainerHeaderModal = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-top: 15px;
`;
export const TagSearch = styled.div`
  padding: 5px 10px 5px 10px;
  background-color: #cedcff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #a7bfff;
  }
`;
export const ContainerRecentSearch = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px 0px 5px 5px;
  border-radius: 6px;

  &:hover {
    background-color: #dce1ee;
  }
`;
export const HrSearch = styled.div`
  width: 100%;
  height: 1px;
  background-color: #8a97aa;
  opacity: 0.2;
  margin-top: 15px;
`;
