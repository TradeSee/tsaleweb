import React from "react";
import { ContainerHeaderModal, HrSearch, TagSearch } from "../styles";
import { RowContainer, TextDefault } from "../../../../assets/styles";
import { searchData } from "./SearchData";
import putRecentSearch from "../../../../hooks/putRecentSearch";

export default function HeaderSearchModal({attModal}) {
    const openNewTab = (path, key, title) => {
        window.open(path, "_blank");
        putRecentSearch({
            rank: 1,
            key: key,
            route: path,
            title
        })
        attModal('search')
    };
    return(
        <>
            <ContainerHeaderModal>
                <TextDefault size="13px" color="#8a97aa" >Popular Modules</TextDefault>
                <RowContainer style={{marginTop: 15}}>
                    {searchData.slice(0, 5).map((item) => (
                        <TagSearch key={item.key} onClick={() => openNewTab(item.route, item.key, item.title)}>
                            <TextDefault size="13px" color="#4b4b4b">{item.title}</TextDefault>
                        </TagSearch>
                    ))}
                </RowContainer>
            </ContainerHeaderModal>
            <HrSearch/>
        </>
    )
}