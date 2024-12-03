import { useState, useEffect } from "react";

import useErrors from "../../hooks/useErrors";
import getUserInfo, {
  updateUser,
  changePassword,
  updateAddress,
} from "../../hooks/getUsers";

import isValidEmail from "./utils/isValidEmail";
import getCompanyInfo from "../../hooks/getCompanyInfo";
import updateCompanyInfo from "../../hooks/updateCompanyInfo";
import { addNotificationDraft } from "../../hooks/notifications";
import { pushMyNotification } from "../../hooks/myNotification";

export default function useProfile() {
  const [actualInfo, setActualInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");

  const [personalInfoChanged, setPersonalInfoChanged] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [AddressChanged, setAddressChanged] = useState(false);

  const [companyName, setCompanyName] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [addressCompany, setAddressCompany] = useState("")
  const [site, setSite] = useState("")
  const [roleCompany, setRoleCompany] = useState("")
  const [productsInterested, setProductsInterested] = useState("")
  const [tableData, setTableData] = useState([])
  const [companyCountry, setCompanyCountry] = useState("")

  const { errors, setError, removeError } = useErrors();

  const updateInfo = () => {
    let Company = {
      coporateName: companyName,
      address: addressCompany,
      idNumber: idNumber,
      companyN: companyCountry,
      activity: roleCompany,
      site: site,
      contacts: tableData,
      product: productsInterested,
    };

    updateCompanyInfo(Company)
      .then((resp) => {
        console.log("OK");
        console.log(resp);        
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);       
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const userInfo = await getUserInfo();

        setActualInfo(userInfo);
        setName(userInfo.userData?.name);
        setLastName(userInfo.userData?.lastName);
        setEmail(userInfo?.email);
        setPhone(userInfo.userData?.phone);
        setRole(userInfo.userData?.role || "Commercial");

        setCity(userInfo.userData?.address?.city);
        setCountry(userInfo.userData?.address?.country);
        setLine1(userInfo.userData?.address?.line1);
        setLine2(userInfo.userData?.address?.line2);
        setPostalCode(userInfo.userData?.address?.postalCode);
        setState(userInfo.userData?.address?.state);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    getCompanyInfo()
    .then((resp) => {
      setCompanyName(resp.coporateName || "");
      setAddressCompany(resp.address || "");
      setIdNumber(resp.idNumber || "");
      setCompanyCountry(resp.companyN || "");
      setRoleCompany(resp.activity || "");
      setSite(resp.site || "");
      setTableData(resp.contacts ? resp.contacts : [] || "");
      setProductsInterested(resp.product || "");
    })
    .catch((e) => {
      console.log("ERROR: ");
      console.log(e);
    });

  }, []);

  //Company Profile
  function handleChangeCompanyName(event) {
    setCompanyName(event.target.value);

    if (event.target.value !== actualInfo.userData.companyName) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "companyName", message: "Insert a name!" });
    } else {
      removeError("companyName");
    }
  }
  function handleChangeIdNumber(event) {
    setIdNumber(event.target.value);

    if (event.target.value !== actualInfo.userData.idNumber) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "idNumber", message: "Insert a ID Number!" });
    } else {
      removeError("idNumber");
    }
  }
  function handleChangeAddressCompany(event) {
    setAddressCompany(event.target.value);

    if (event.target.value !== actualInfo.userData.addressCompany) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "addressCompany", message: "Insert a Address Company!" });
    } else {
      removeError("addressCompany");
    }
  }
  function handleChangeSite(event) {
    setSite(event.target.value);

    if (event.target.value !== actualInfo.userData.site) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "site", message: "Insert a Site!" });
    } else {
      removeError("site");
    }
  }
  function handleChangeRoleCompany(event) {
    setRoleCompany(event.target.value);

    if (event.target.value !== actualInfo.userData.roleCompany) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "roleCompany", message: "Insert a Role Company!" });
    } else {
      removeError("roleCompany");
    }
  }
  function handleChangeProductsInterested(event) {
    setProductsInterested(event.target.value);

    if (event.target.value !== actualInfo.userData.productsInterested) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "productsInterested", message: "Insert a Products Interested!" });
    } else {
      removeError("productsInterested");
    }
  }
  function handleChangeCompanyCountry(event) {
    setCompanyCountry(event.target.value);

    if (event.target.value !== actualInfo.userData.companyCountry) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "companyCountry", message: "Insert a Company Country!" });
    } else {
      removeError("companyCountry");
    }
  }
  // Personal Info Inputs controls and Submit
  function handleChangeName(event) {
    setName(event.target.value);

    if (event.target.value !== actualInfo.userData.name) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "name", message: "Insert a name!" });
    } else {
      removeError("name");
    }
  }

  function handleChangeLastName(event) {
    setLastName(event.target.value);

    if (event.target.value !== actualInfo.userData.lastName) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "lastName", message: "Insert a last name!" });
    } else {
      removeError("lastName");
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);

    if (event.target.value !== actualInfo?.email) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "email", message: "Insert a e-mail!" });
    } else {
      removeError("lastName");
    }

    if (!isValidEmail(event.target.value)) {
      setError({ field: "email", message: "Insert a valid e-mail!" });
    } else {
      removeError("email");
    }
  }

  function handleChangePhone(event) {
    setPhone(event.target.value);

    if (event.target.value !== actualInfo?.userData?.phone) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }

    if (event.target.value === "") {
      setError({ field: "phone", message: "Insert a phone!" });
    } else {
      removeError("phone");
    }
  }

  function handleChangeRole(event) {
    setRole(event.target.value);

    if (event.target.value !== actualInfo?.userData?.role) {
      setPersonalInfoChanged(true);
    } else {
      setPersonalInfoChanged(false);
    }
  }

  function handleCancelPersonal(event) {
    //event.preventDefault();

    setName(actualInfo.userData.name || "");
    setLastName(actualInfo.userData.lastName || "");
    setEmail(actualInfo?.email || "");
    setPhone(actualInfo?.userData?.phone || "");
    setRole(actualInfo?.userData?.role);

    setPersonalInfoChanged(false);
  }

  function handleConfirmPersonal(event) {

    //event.preventDefault();

    const info = {
      name,
      lastName,
      email,
      phone,
      role,
    };

    updateUser(actualInfo.uid, info);

    setPersonalInfoChanged(false);
  }

  // Change Password Inputs
  function handleActualPassword(event) {
    setActualPassword(event.target.value);

    if (event.target.value !== "") {
      setIsChangingPassword(true);
    } else {
      setIsChangingPassword(false);
    }
  }

  function handleNewPassword(event) {
    setNewPassword(event.target.value);

    if (event.target.value !== "") {
      setIsChangingPassword(true);
    } else {
      setIsChangingPassword(false);
    }
  }

  function handleConfirmPassword(event) {
    setConfirmNewPassword(event.target.value);

    if (event.target.value !== newPassword) {
      setError({
        field: "confirmPassword",
        message: "The passwords does not match",
      });
    } else {
      removeError("confirmPassword");
    }

    if (event.target.value !== "") {
      setIsChangingPassword(true);
    } else {
      setIsChangingPassword(false);
    }
  }

  function handleCancelChangePassword(event) {
    //event.preventDefault();

    setActualPassword("");
    setNewPassword("");
    setConfirmNewPassword("");

    setIsChangingPassword(false);
  }

  function getDataHoraAtual() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const segundo = String(agora.getSeconds()).padStart(2, '0');
    const milissegundo = String(agora.getMilliseconds()).padStart(3, '0');
  
    return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.${milissegundo}Z`;
  }

  function formatCurrentDateTime() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    
    let hour = date.getHours();
    let minute = date.getMinutes();
    let amOrPm = hour >= 12 ? 'pm' : 'am';
    
    if (hour > 12) {
        hour -= 12;
    }
    
    if (minute < 10) {
        minute = '0' + minute;
    }
    
    const formattedDateTime = `at ${hour}:${minute}${amOrPm} on ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}.`;
    
    return formattedDateTime;
}


function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // convertendo p um inteiro de 32 bits
  }
  return hash;
}
  

  function handleChangePassword(event) {
    //event.preventDefault();

    return new Promise((resolve, reject) => {
      changePassword(email, actualPassword, newPassword).then(resp => {
        setIsChangingPassword(false);
        resolve(resp);
        if(resp) {
          const text = "Change Password";
          const type = "other";
          const status = "approved";
          const created_at =  getDataHoraAtual();

          const id = hashCode(`${text}${type}${status}${created_at}`).toString(16).substr(0, 5);

          let obj = {
            id,          
            text,
            type,
            description: `Just a quick update to let you know that your password was changed ${formatCurrentDateTime()}`,
            route: "/profile",
            status,
            created_at,
          }

          pushMyNotification(obj)

          setActualPassword("")
          setNewPassword("")
          setConfirmNewPassword("")
        }
      })
    })
  }

  // Address Inputs controls
  function handleChangeCity(event) {
    setCity(event.target.value);

    if (event.target.value !== actualInfo.userData.city) {
      setAddressChanged(true);
    } else {
      setAddressChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "city", message: "Insert a city!" });
    } else {
      removeError("city");
    }
  }

  function handleChangeCountry(event) {
    setCountry(event.target.value);

    if (event.target.value !== actualInfo?.country) {
      setAddressChanged(true);
    } else {
      setAddressChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "country", message: "Insert a country!" });
    } else {
      removeError("country");
    }
  }

  function handleChangeLine1(event) {
    setLine1(event.target.value);

    if (event.target.value !== actualInfo?.userData?.line1) {
      setAddressChanged(true);
    } else {
      setAddressChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "line", message: "Insert a line 1!" });
    } else {
      removeError("line");
    }
  }

  function handleChangeLine2(event) {
    setLine2(event.target.value);

    if (event.target.value !== actualInfo?.userData?.line1) {
      setAddressChanged(true);
    } else {
      setAddressChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "line", message: "Insert a line 2!" });
    } else {
      removeError("line");
    }
  }

  function handleChangePostalCode(event) {
    setPostalCode(event.target.value);

    if (event.target.value !== actualInfo?.userData?.postalCode) {
      setAddressChanged(true);
    } else {
      setAddressChanged(false);
    }
  }

  function handleChangeState(event) {
    setState(event.target.value);

    if (event.target.value !== actualInfo?.userData?.state) {
      setAddressChanged(true);
    } else {
      setAddressChanged(false);
    }

    if (!event.target.value) {
      setError({ field: "state", message: "Insert a state!" });
    } else {
      removeError("state");
    }
  }

  function handleCancelAddress(event) {
    event.preventDefault();

    setCity(actualInfo.userData.city || "");
    setCountry(actualInfo?.country || "");
    setLine1(actualInfo?.userData?.line1 || "");
    setLine2(actualInfo?.userData?.line2 || "");
    setPostalCode(actualInfo?.userData?.postalCode || "");
    setState(actualInfo?.userData?.state || "");

    setAddressChanged(false);
  }

  function handleChangeAddress(event) {
    event.preventDefault();

    const info = {
      city,
      state,
      country,
      postalCode,
      line1,
      line2: line2 || "",
    };

    updateAddress(actualInfo.uid, info);

    setAddressChanged(false);
  }

  function handleChangeTable(event) {
    setTableData(event)
  }

  return {
    isLoading,
    errors,

    name,
    lastName,
    email,
    phone,
    role,

    actualPassword,
    newPassword,
    confirmNewPassword,

    city,
    country,
    line1,
    line2,
    postalCode,
    state,

    personalInfoChanged,
    handleChangeName,
    handleChangeLastName,
    handleChangePhone,
    handleChangeEmail,
    handleChangeRole,
    handleCancelPersonal,
    handleConfirmPersonal,

    isChangingPassword,
    handleActualPassword,
    handleNewPassword,
    handleConfirmPassword,
    handleCancelChangePassword,
    handleChangePassword,

    AddressChanged,
    handleChangeCity,
    handleChangeCountry,
    handleChangeLine1,
    handleChangeLine2,
    handleChangePostalCode,
    handleChangeState,
    handleCancelAddress,
    handleChangeAddress,

    companyName,
    idNumber,
    addressCompany,
    site,
    roleCompany,
    productsInterested,
    companyCountry,
    tableData,

    handleChangeCompanyCountry,
    handleChangeAddressCompany,
    handleChangeSite,
    handleChangeRoleCompany,
    handleChangeProductsInterested,
    handleChangeIdNumber,
    handleChangeCompanyName,
    handleChangeTable,

    updateInfo
  };
}
