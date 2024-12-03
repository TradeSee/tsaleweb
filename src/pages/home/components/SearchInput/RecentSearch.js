import React, { useEffect, useState } from "react";
import { ContainerHeaderModal, ContainerRecentSearch, HrSearch, TagSearch } from "../styles";
import { ColumnContainer, ImgDefault, RowContainer, TextDefault } from "../../../../assets/styles";
import { searchData } from "./SearchData";
import getRecentSearch from "../../../../hooks/getRecentSearch";
import HistoryIcon from "../../../../icons/historyv2.png"
import putRecentSearch from "../../../../hooks/putRecentSearch";

export default function RecentSearch({attModal}) {

    const [listRecent, setListRecent] = useState([])
    const [load, setLoad] = useState(0)

    useEffect(() => {
        getRecentSearch().then(resp => {
            setListRecent(resp)
            setLoad(0)
        })
        .catch(err => {
            setLoad(1)
        })
    }, [load])

    const openNewTab = (path, key, title) => {
        window.open(path, "_blank");
        putRecentSearch({
            rank: 1,
            key: key,
            route: path,
            title
        })
        attModal()
    };
    return(
        <>
        <HrSearch/>
        {load == 0 ? (
            <ContainerHeaderModal>
                <TextDefault size="13px" color="#8a97aa" >Recent Searches</TextDefault>
                <ColumnContainer style={{marginTop: 10}}>
                    {listRecent.map((item) => (
                        <ContainerRecentSearch key={item.key} onClick={() => openNewTab(item.route, item.key, item.title)}>
                            <RowContainer style={{alignItems: "center"}}>
                                <ImgDefault src={HistoryIcon} width="20px" height="20px" style={{opacity: 0.5}} />
                                <TextDefault size="13px" color="#8a97aa" style={{marginLeft: 15}}>{item.title}</TextDefault>
                            </RowContainer>
                        </ContainerRecentSearch>
                    ))}
                </ColumnContainer>
            </ContainerHeaderModal>
        ) : ""}
        </>
    )
}