import React, {FC} from 'react'
import { useAppSelector } from '../app/hooks';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import LogoutIcon from '@mui/icons-material/Logout';
import TableViewIcon from '@mui/icons-material/TableView';
import BadgeIcon from '@mui/icons-material/Badge';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import HistoryIcon from '@mui/icons-material/History'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AdbIcon from '@mui/icons-material/Adb';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import BugReportIcon from '@mui/icons-material/BugReport';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import NewAndRejectedClaims from './UserClaims/New&RejectedClaims';

import { SaveClaimApplication } from './ClaimApplication/ClaimApplication';
import ClaimHistory from './ClaimApplication/ClaimHistory';
import UserClaimHistory from './UserClaims/UserClaimHistory';
import ClaimStatusDetails from './ClaimStatus/AllClaimApplicationsStatus';
import NewClaimApplications from './ClaimStatus/NewClaimApplications';
import { IRoutesState } from '../types/cmstypes';
import { getUserAppFeatures } from '../service/cmsservices';
import { KhLoader } from './KhLoader/KhLoader';
import Sidebar from './CMSSideBar';
import { ClaimType } from './ClaimType/Claimtype';
import CategoryIcon from '@mui/icons-material/Category';
import EntireClaimTypes from './ClaimType/EntireClaimTypes';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';




export default function SidebarRoute() {
  const [drawerData, setDrawerData] = React.useState<IRoutesState[]>([]);
  const SidebarData: IRoutesState[] = [];
  const UserId = useAppSelector((state) => state.user.UserData?.UserId);

  //   SidebarData.length = 0; // Clear existing data in SidebarData

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (UserId) {
          const data = await getUserAppFeatures(UserId);
          setDrawerData(data);
        }
      } catch (error) {
        // Handle error if needed...
      }
    };

    fetchData();
  }, [UserId]);

  // Map the string component names to their respective React components

  const componentMapping: { [key: string]: FC<{}> | React.ReactNode } = {
    ClaimApplication : SaveClaimApplication ,
    UserClaimHistory : UserClaimHistory ,
    ClaimStatusDetails : ClaimStatusDetails ,
    NewClaimApplications : NewClaimApplications ,
    ClaimHistory : ClaimHistory ,
    NewAndRejectedClaims : NewAndRejectedClaims ,
    ClaimType : ClaimType ,
    EntireClaimTypes : EntireClaimTypes ,
    
    };

  // Map the icon names to the actual components
  const mapIconToComponent = (iconName: string) => {
    switch (iconName) {
      case "CurrencyRupeeIcon":
        return <CurrencyRupeeIcon sx={{ color: "purple" }} />;
      case "HistoryIcon":
        return <HistoryIcon sx={{ color: "purple" }} />;
      case "HistoryIcon":
        return <HistoryIcon sx={{ color: "purple" }} />;
      case "TableViewIcon":
        return <TableViewIcon sx={{ color: "purple" }} />;
      case "TableViewIcon":
        return <TableViewIcon sx={{ color: "purple" }} />;
      case "ChangeCircleIcon":
        return <ChangeCircleIcon sx={{ color: "purple" }} />;
      case "CategoryIcon":
        return <CategoryIcon sx={{ color: "purple" }} />;
      case "SportsBasketballIcon":
        return <SportsBasketballIcon sx={{ color: "purple" }} />;

    }
  };

  SidebarData.push(
    ...drawerData.map((item) => ({
      UserId: item.UserId,
      AppId: item.AppId,
      AppFeatureId: item.AppFeatureId,
      FeatureName: item.FeatureName,
      Icon: mapIconToComponent(item.Icon),
      Link: item.Link, // Set Link to an empty string
      Components: componentMapping[item.Components], // Use the mapping to get the component
    }))
  );
  return (
    <div>
      {/* Render sidebar items here using SidebarData */}
      {UserId ? <Sidebar SidebarData={SidebarData} /> : <KhLoader />}
    </div>
  );
}