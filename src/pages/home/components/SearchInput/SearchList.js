import React, { useEffect, useMemo } from "react";
import { searchData } from "./SearchData";
import { CardIcon, ContainerSearchList } from "../styles";
import { ColumnContainer, ImgDefault, RowContainer, TextDefault } from "../../../../assets/styles";
import LinkIcon from "../../../../icons/external-link.png"
import EmptyIcon from "../../../../icons/empty-folder.png"
import putRecentSearch from "../../../../hooks/putRecentSearch";

export default function SearchList({target, attModal}) {
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

    useEffect(() => {
        console.log("target")
        console.log(target)
    }, [target])

    const filteredData = useMemo(() => {
        return searchData.filter(item => {
          return item.title.toLowerCase().includes(target.toLowerCase()) || item.subTitle.toLowerCase().includes(target.toLowerCase());
        });
    }, [target]);
    

    return(
        <>
            {filteredData.length > 0 ? filteredData.map((item) => (
                <ContainerSearchList key={item.key} onClick={() => openNewTab(item.route, item.key, item.title)}>
                    <RowContainer style={{alignItems: 'center', position: "relative"}}>
                        <CardIcon>
                            <ImgDefault src={item.icon} height="35px" width="35px"/>
                        </CardIcon>
                        <ColumnContainer style={{marginLeft: 35, width: "80%"}}>
                            <TextDefault size="20px" color="#4b4b4b" bold="800">{item.title}</TextDefault>
                            <TextDefault size="14px" color="#8a97aa" bold="700">{item.subTitle}</TextDefault>
                        </ColumnContainer>
                        <ImgDefault src={LinkIcon} height="15px" width="15px" style={{right: 0, position: "absolute"}}/>
                    </RowContainer>
                </ContainerSearchList>
            )) : (
                <RowContainer style={{alignItems: "center", height: "100%", justifyContent: "center"}}>
                    <ImgDefault src={EmptyIcon} />
                    <TextDefault size="17px" color="#8a97aa" bold="800" style={{marginLeft: 15}}>Not Found</TextDefault>
                </RowContainer>
            )}
        </>
        )
}