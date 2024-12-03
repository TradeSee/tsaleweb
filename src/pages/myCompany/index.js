import React, { useEffect, useState } from "react";
import { authScreen } from "../../contexts/auth";
import { Grid, Snackbar } from "@mui/material";
import LoadingPage from "../../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import Drawer from "../../components/Drawer";
import { BtnDefault, CardCompany, CircleDefault, ColumnContainer, IconHistory, ImgDefault, IndicatorCard, RowContainer, TextDefault } from "../../assets/styles";
import RegisterCompanyIcon from '../../icons/companyProfileIcon.png'
import MyProductsIcon from '../../icons/myProductIcon.png'
import ChatIcon from '../../icons/chatIcon.png'
import ChartMixed from "./components/ChartMixed";
import RadialBar from "./components/RadialBar";
import ViewIcon from "../../icons/ViewIcon.png"

import LocationIcon from '../../icons/pinLocationIcon.png'
import ContactIcon from '../../icons/phoneIcon.png'
import MailIcon from '../../icons/mailIcon.png'
import HistIcon from '../../icons/history.png'
import getCompanyInfo from "../../hooks/getCompanyInfo";
import { NotificationBtn, Notifications } from "../home/styles";


export default function MyCompany() {
    const [auth, setAuth] = useState(false);
    const [toggleDrawer, useTroggleDawer] = useState(false);

    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [company, setCompany] = useState("")
    const [sponsor, setSponsor] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        authScreen().then((res) => {
          if (res) {
            setTimeout(() => {
              setAuth(true);

              getCompanyInfo()
              .then((resp) => {
                  console.log('Company')
                  console.log(resp)
                  setAddress(resp.address)
                  setEmail(resp.email)
                  setContact(resp.contact)
                  setCompany(resp.coporateName)
                  setSponsor(resp.sponsor)
              })

            }, 1000);           
          } else {
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        });
      });

      function SetToggle(state) {
        useTroggleDawer(state);
      }

    return(
        <>
        {auth ? (
            <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
            
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>

            <Grid item xs={toggleDrawer ? 10 : 11}>
                <ColumnContainer style={{marginTop: 40}}>
                    <RowContainer>
                        <TextDefault color="#4b4b4b" size="35px">My Company</TextDefault>
                        <ImgDefault src={ViewIcon} width='18px' height='14px' style={{marginLeft: 20, marginTop: 15}}/>
                        <TextDefault color="#4b4b4b" size="14px" style={{marginLeft: 7, marginTop: 15}}>374 views</TextDefault>
                    </RowContainer>
                    <TextDefault color="#8a97aa" size="16px" style={{marginTop: 10}}>Dashboard</TextDefault>
                </ColumnContainer>

                <Grid container columnSpacing={4} xs={12} style={{marginTop: 40, height: '86%'}} >
                    {/** Paineis da Esqueda */}
                    <Grid item xs={7.5}>
                         {/** Esqueda Superior*/}
                        <Grid item xs={12}>
                            <CardCompany>
                                <RowContainer style={{width: '100%', padding: 20, height: 390}}>
                                    <ChartMixed/>
                                </RowContainer>
                            </CardCompany>
                        </Grid>
                        {/** Esqueda Inferior*/}
                        <Grid container xs={12} style={{marginTop: '2%', height: 320}}>
                            <Grid container xs={4} style={{marginRight: "8%"}}>
                                <CardCompany height='100%'>
                                    <ColumnContainer style={{paddingTop: 20, paddingLeft: 30, width: '100%'}}>
                                        <TextDefault color="#4b4b4b" size='25px'>Search history</TextDefault>

                                        <RowContainer style={{marginTop: 10, alignItems: 'center'}}>
                                            <IconHistory>
                                                <ImgDefault src={HistIcon} width='25px' height='25px'/>
                                            </IconHistory>

                                            <RowContainer style={{justifyContent: 'space-between', alignItems: 'center', width: '75%'}}>
                                                <ColumnContainer style={{marginLeft: 20}}>
                                                    <TextDefault color="#4b4b4b" size='20px'>Iron</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px' style={{marginTop: 5}}>2023/12/12</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px'>United State</TextDefault>
                                                </ColumnContainer>

                                                <RowContainer>
                                                    <TextDefault color="#4b4b4b" size='18px'>1,000.00 USD</TextDefault>
                                                </RowContainer>
                                            </RowContainer>

                                        </RowContainer>
                                        <RowContainer style={{marginTop: 10, alignItems: 'center'}}>
                                            <IconHistory>
                                                <ImgDefault src={HistIcon} width='25px' height='25px'/>
                                            </IconHistory>

                                            <RowContainer style={{justifyContent: 'space-between', alignItems: 'center', width: '75%'}}>
                                                <ColumnContainer style={{marginLeft: 20}}>
                                                    <TextDefault color="#4b4b4b" size='20px'>Scrap</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px' style={{marginTop: 5}}>2023/12/15</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px'>Canada</TextDefault>
                                                </ColumnContainer>

                                                <RowContainer>
                                                    <TextDefault color="#4b4b4b" size='18px'>990.00 USD</TextDefault>
                                                </RowContainer>
                                            </RowContainer>

                                        </RowContainer>
                                        <RowContainer style={{marginTop: 10, alignItems: 'center'}}>
                                            <IconHistory>
                                                <ImgDefault src={HistIcon} width='25px' height='25px'/>
                                            </IconHistory>

                                            <RowContainer style={{justifyContent: 'space-between', alignItems: 'center', width: '75%'}}>
                                                <ColumnContainer style={{marginLeft: 20}}>
                                                    <TextDefault color="#4b4b4b" size='20px'>Aluiminum</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px' style={{marginTop: 5}}>2023/12/16</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px'>Germany</TextDefault>
                                                </ColumnContainer>

                                                <RowContainer>
                                                    <TextDefault color="#4b4b4b" size='18px'>3,000.00 USD</TextDefault>
                                                </RowContainer>
                                            </RowContainer>
                                        </RowContainer>
                                        <RowContainer style={{marginTop: 10, marginBottom: 20, alignItems: 'center'}}>
                                            <IconHistory>
                                                <ImgDefault src={HistIcon} width='25px' height='25px'/>
                                            </IconHistory>
                                            
                                            <RowContainer style={{justifyContent: 'space-between', alignItems: 'center', width: '75%'}}>
                                                <ColumnContainer style={{marginLeft: 20}}>
                                                    <TextDefault color="#4b4b4b" size='20px'>Zinc</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px' style={{marginTop: 5}}>2023/12/17</TextDefault>
                                                    <TextDefault color="#8a97aa" size='12px'>Brazil</TextDefault>
                                                </ColumnContainer>

                                                <RowContainer>
                                                    <TextDefault color="#4b4b4b" size='18px'>6,200.00 USD</TextDefault>
                                                </RowContainer>
                                            </RowContainer>
                                        </RowContainer>
                                    </ColumnContainer>
                                </CardCompany>                                 
                            </Grid>
                            <Grid xs={7}>
                                <CardCompany>
                                    <RowContainer style={{width: '100%', paddingTop: 20, paddingLeft: 20}}>
                                        <RadialBar/>
                                    </RowContainer>
                                </CardCompany>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/** Paineis da Direita */}
                    <Grid item xs={4.5}>
                        <Grid container xs={12}>
                            <Grid item xs={12}>
                                <CardCompany color='#fff'>
                                    <ColumnContainer style={{width: '100%'}}>
                                        <TextDefault color='#4b4b4b' size="23px" bold="800">My Products</TextDefault>                                    
                                        <RowContainer style={{marginTop: 20}}>
                                            <Grid item xs={4}>
                                                <IndicatorCard color="#F19120">
                                                    <ColumnContainer style={{width: '100%', alignItems: 'center'}}>
                                                        <div className="barColor"/>
                                                        <TextDefault color="#4b4b4b" size="17px" style={{marginTop: 15}}>Under review</TextDefault>
                                                        <TextDefault color="#4b4b4b" size="45px" style={{marginTop: 25}}>2</TextDefault>
                                                    </ColumnContainer>
                                                </IndicatorCard>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <IndicatorCard color="#E93939">
                                                    <ColumnContainer style={{width: '100%', alignItems: 'center'}}>
                                                        <div className="barColor"/>
                                                        <TextDefault color="#4b4b4b" size="17px" style={{marginTop: 15}}>Unpublished</TextDefault>
                                                        <TextDefault color="#4b4b4b" size="45px" style={{marginTop: 25}}>7</TextDefault>
                                                    </ColumnContainer>
                                                </IndicatorCard>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <IndicatorCard color="#3BC17A">
                                                    <ColumnContainer style={{width: '100%', alignItems: 'center'}}>
                                                        <div className="barColor"/>
                                                        <TextDefault color="#4b4b4b" size="17px" style={{marginTop: 15}}>Published</TextDefault>
                                                        <TextDefault color="#4b4b4b" size="45px" style={{marginTop: 25}}>3</TextDefault>
                                                    </ColumnContainer>
                                                </IndicatorCard>
                                            </Grid>
                                        </RowContainer>
                                    </ColumnContainer>

                                </CardCompany>
                            </Grid>
                            <Grid item xs={12}>
                                <CardCompany style={{marginTop: 40}} color='#fff'>
                                    <ColumnContainer style={{width: '97%'}}>
                                        <TextDefault color="#4b4b4b" size='23px' bold="800" style={{cursor: 'pointer'}} onClick={() => navigate('/my-company/profile')}>{company ? company : "Register Company"}</TextDefault>

                                        <ColumnContainer style={{marginTop: 20, backgroundColor: "#F8F9FB", paddingLeft: 20, paddingBottom: 20, paddingTop: 10}}>
                                            <RowContainer style={{alignItems: 'center', marginTop: 10}}>
                                                <ImgDefault src={LocationIcon} width='15px' height='20px' />
                                                <TextDefault color="#4b4b4b" size='17px' bold='400' style={{marginLeft: 10}} >{address}</TextDefault>
                                            </RowContainer>

                                            <RowContainer style={{alignItems: 'center', marginTop: 10}}>
                                                <ImgDefault src={MailIcon} width='17px' height='13px' />
                                                <TextDefault color="#4b4b4b" size='17px' bold="400" style={{marginLeft: 10}}>{email}</TextDefault>
                                            </RowContainer>

                                            <RowContainer style={{alignItems: 'center', marginTop: 10}}>
                                                <ImgDefault src={ContactIcon} width='17px' height='17px' />
                                                <TextDefault color="#4b4b4b" size='17px' bold="400" style={{marginLeft: 10}}>{contact}</TextDefault>
                                            </RowContainer>

                                        </ColumnContainer>
                                    </ColumnContainer>
                                    
                                </CardCompany>
                            </Grid>
                            <Grid item xs={12}>
                                <CardCompany style={{marginTop: 40}} color='#fff'>
                                    <ColumnContainer style={{width: '97%'}}>
                                        <TextDefault color="#4b4b4b" size='23px' bold="800">Quick Access</TextDefault>

                                        <ColumnContainer style={{marginTop: 20, backgroundColor: "#F8F9FB", paddingLeft: 10, paddingBottom: 20, paddingTop: 10}}>                                            
                                            <RowContainer className="btnCardDash" style={{alignItems: 'center', marginTop: 7}} onClick={() => navigate('/my-company/profile')}>
                                                <IconHistory>
                                                    <ImgDefault src={RegisterCompanyIcon} width='25px' height='20px'/>
                                                </IconHistory>
                                                <TextDefault color="#4b4b4b" size='17px' bold='700' style={{marginLeft: 10}} >Edit Company Profile</TextDefault>
                                            </RowContainer>

                                            <RowContainer className="btnCardDash" style={{alignItems: 'center', marginTop: 7}}>
                                                <IconHistory>
                                                    <ImgDefault src={MyProductsIcon} width='25px' height='25px'/>
                                                </IconHistory>
                                                <TextDefault color="#4b4b4b" size='17px' bold="700" style={{marginLeft: 10}}>Edit My Products</TextDefault>
                                            </RowContainer>

                                            <RowContainer className="btnCardDash" style={{alignItems: 'center', marginTop: 7}}>
                                                <IconHistory>
                                                    <ImgDefault src={ChatIcon} width='23px' height='23px'/>
                                                </IconHistory>
                                                <TextDefault color="#4b4b4b" size='17px' bold="700" style={{marginLeft: 10}}>Corporate Chat</TextDefault>
                                            </RowContainer>

                                        </ColumnContainer>
                                    </ColumnContainer>
                                    
                                </CardCompany>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            </Grid>
        ) : (
            <LoadingPage />
        )}
        </>
    )
}