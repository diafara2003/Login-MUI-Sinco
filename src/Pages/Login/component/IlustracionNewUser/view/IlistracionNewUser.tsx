import { LoadingButton } from '@mui/lab'
import { Typography } from '@mui/material'

import LoginIcon from '@mui/icons-material/Login';
import { SobreCorreo } from '../../../../../SharedComponents/SVGComponent';

type props = {
    homeBack: () => void,
    correo:string;
}

export const IlistracionNewUser = ({ homeBack ,correo}: props) => {
    return (
        <>
            <div id="DivContenido" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1.5rem'
            }}>

                <div id='DivIlistration' style={{
                    display: 'flex', width: '12.20125rem', height: '10.75rem',
                    padding: '0rem 0.00106rem 0.08013rem 0.14388rem', justifyContent: 'center', alignItems: 'center'
                }}>
                    <SobreCorreo />

                </div>

                <div id='DivTitulo' style={{
                    display: 'flex', width: '31.25rem', flexDirection: 'column',
                    alignItems: 'center', gap: '1rem'
                }}>
                    <Typography variant="h4" color="rgba(16, 24, 64, 0.87)"
                        fontSize={'1.25rem'} 
                    >¡Casi listo! Verifica tu cuenta</Typography>
                    <Typography variant="h6" color="rgba(16, 24, 64, 0.87)"
                        textAlign={'center'} fontSize={'1rem'}
                    >
                        Hemos enviado un mensaje de verificación a <Typography variant='h6' fontStyle={'italic'}>{correo}.</Typography>
                        Por favor, sigue las indicaciones que encontrarás en tu correo electrónico para completar el proceso.
                    </Typography>
                </div>
            </div >

            <div id='DivAcciones' style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem', alignSelf: 'stretch'
            }}>
                <LoadingButton
                    size="medium"
                    type="submit"
                    fullWidth
                    
                    loadingPosition="start"
                    variant="contained"
                    startIcon={<LoginIcon />}
                    loading={false}
                    onClick={homeBack}
                >
                    Ir al Ingreso
                </LoadingButton>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant='h6' color="rgba(16, 24, 64, 0.87)"
                        fontSize={"1rem"} >
                        ¿No te llego el correo?
                    </Typography>
                    <Typography variant='h6' color="#008BB0"
                        pl={1}
                        fontSize={"1rem"} >
                        Reenviar Nuevamente
                    </Typography>
                </div>
            </div>
        </>
    )
}
