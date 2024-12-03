import React, { useEffect, useRef, useState } from "react";
import { BackgroundClose, BallNotification, ColumnContainer, ContainerModal, ImgDefault, RowContainer, TextDefault } from "../../../assets/styles";
import notificationIcon from "../../../icons/notificationIcon.png"
import megaIcon from "../../../icons/megaphone.png"
import updateIcon from "../../../icons/system-update.png"
import newsIcon from "../../../icons/newspaper-folded.png"
import { getPromotions } from "../../../hooks/notifications";
import Capitalize from "../../../utils/capitalize";
import { getMyNotification, pushMyNotification } from "../../../hooks/myNotification";

export default function NotificationPainel({...props}) {
    const [promotions, setPromotions] = useState([])
    const [icon, setIcon] = useState(notificationIcon)
    const [isClickRead, setIsClickRead] = useState(0)

    useEffect(() => {
        
        if(props.visible && isClickRead == 0) {
            setIsClickRead(isClickRead+1)

            promotions.forEach((item) => {                
                pushMyNotification({
                    created_at: item.created_at,
                    id: item.id,
                    status: item.status,
                    text: item.text,
                    type: item.type,
                    description: item.description,
                    route: item.route,
                    key: item.key,
                    read: true
                })
            })
        }

    }, [props.visible])

    useEffect(() => {        
        getPromotions().then(respAr1 => {

            const idSet = new Set();
            const newArray = [];


            
            getMyNotification()
            .then(respAr2 => {



                respAr2.forEach(item => {
                    idSet.add(item.id);
                    newArray.push({ ...item });
                });
            
                respAr1.forEach(item => {
                    if (idSet.has(item.id)) {
                        const existingItem = newArray.find(element => element.id === item.id);
                        existingItem.read = true;
                    } else {
                        newArray.push({ ...item, read: false });
                    }
                });
                
                console.log(`%cNEW ARRAY`, "color: #fff; background-color: #F19120; padding: 5px; border-radius: 7px;")
                console.log(newArray)
                
                const objRead = newArray.find(obj => obj.read === false);
                if (objRead) {
                    props.readIndicator(true)
                } else {
                    props.readIndicator(false)                
                }
                const short = newArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPromotions(short)                        
            })
            .catch(e => {
                console.log("%cAtenção:", "color: #fff; background-color: #E93939; padding: 5px; border-radius: 7px;");
                console.log(`%c${e}`, "color: #fff; background-color: #F19120; padding: 5px; border-radius: 7px;");

                setPromotions(respAr1)
                props.readIndicator(true)
            })
        })



    }, [getPromotions])

    function converterHora(dataHora) {
        const data = new Date(dataHora);
        const hora = data.getHours();
        const minutos = data.getMinutes();
      
        return `${String(hora).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
    }
      
    const chageIcon = (type) => {
        if(type == "news") {
            return(newsIcon)
        } else if(type == "promotion") {
            return(megaIcon)
        } else if(type == "update") {
            return(updateIcon)
        } else {
            return(notificationIcon)
        }
    }

    const openNewTab = (path) => {
        window.open(path, "_blank");
    };

    const clickNotification = (param) => {
        if(param) {
            openNewTab(param);
            props.modal()
        }
    }
    
    return(
        <>
            {props.visible ? (
                <>
                    
                    <ContainerModal>
                        <TextDefault size="22px" color="#4b4b4b" bold="800">Notification</TextDefault>
                        
                        {promotions.map((not) => (

                            <ColumnContainer className="cardNotification" key={not.id} onClick={() => clickNotification(not.route)}>
                                <RowContainer style={{marginTop: 10, justifyContent: "space-between", alignItems: "center"}}>
                                    <RowContainer style={{alignItems: "center", width: "100%"}}>
                                        {!not.read ? (
                                            <BallNotification color="#366dfb"/>
                                        ) : ""}
                                        <ImgDefault src={chageIcon(not.type)} height="12px" width="12px" style={{marginLeft: 12}}/>
                                        <TextDefault size="15px" color="#4b4b4b" bold="700" style={{marginLeft: 5}}>{Capitalize(not.text)}</TextDefault>
                                    </RowContainer>
                                    <TextDefault size="12px" color="#8a97aa" bold="700" style={{marginLeft: 5}}>{converterHora(not.created_at)}</TextDefault>
                                </RowContainer>

                                <TextDefault size="12px" color="#8a97aa" style={{marginLeft: 25, marginTop: 10}} bold="300">{Capitalize(not.description)}</TextDefault>
                            </ColumnContainer>                    
                        ))}
                        

                    </ContainerModal>            
                </>
            ) : ""}
        </>
    )
}