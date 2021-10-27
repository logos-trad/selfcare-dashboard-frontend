import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PartyItem from './PartyItem';

type Props={
    key: string | undefined;
    isDisabled: boolean;
    disabled: boolean;
    borderList:string;
    selectedItem:boolean;
    title:string | undefined;
    subTitle:string | undefined;
    titleColor:string;
    image:string | undefined;
    chip:string;
	action: React.Dispatch<React.MouseEvent <HTMLDivElement, MouseEvent >>;
};
export default function PartyItemContainer({key, isDisabled, borderList,selectedItem,title,subTitle,titleColor,image,chip,action}:Props) {
    return (
        <Grid key={key} container direction={"row"}> 
            <Grid item xs={isDisabled ? 8 : 12}> 
                <Box >
                    <PartyItem
                        bgColor="transparent"
                        borderList={borderList}
                        disabled={isDisabled}
                        selectedItem={selectedItem}
                        title={title}
                        subTitle={subTitle}
                        titleColor={titleColor}
                        titleSize="16px"
                        subTitleSize="14px"
                        image={image}
                        action={action}
                         /> 
                       </Box>
                     </Grid>
                   {isDisabled && 
                     <Grid item xs={4}>
                       <Box >
                       <Grid  className='chip' sx={{borderRadius:'56px', backgroundColor:'#0073E6', fontSize:12,display:'flex',justifyContent:'space-around',marginTop:'20px', marginRight: '10px'}}>
							<Typography variant="caption" sx={{fontSize:'12px',  color:'#FFFFFF'}}>{chip}</Typography>
						</Grid>
                       </Box>
                     </Grid> }
               </Grid>
    );
}
