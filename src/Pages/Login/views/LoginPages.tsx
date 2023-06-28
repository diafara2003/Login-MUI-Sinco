import { Card, CardContent, Grid, IconButton, LinearProgress, Paper, Snackbar, Typography } from '@mui/material';
import { FormularioLogin, IlustrationLogin, RecuperarClavepages } from '../component';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import { useLogin } from '../hook/useLogin';
import CreateAccount from '../component/NewAccountFormulario/View/CreateAccount';
import { IlistracionNewUser } from '../component/IlustracionNewUser/view/IlistracionNewUser';
import IlustracionRecuperarClave from '../component/IlustacionRecuperarClave/view/IlustracionRecuperarClave';




export default function LoginPages() {
    const { handleClose, msnError, open, monstrarMsnError, progress, form, setForm, handleNewUser, correo, setCorreo } = useLogin();

    const formLoad = () => {

        switch (form) {
            case "signin":
                return <FormularioLogin
                    handleFormShow={(value) => setForm(value)}
                    handleError={(msn: string) => {
                        monstrarMsnError(msn, "¡Inicio de sesión fallido!");
                    }} />

            case "forgetPassword":
                return <RecuperarClavepages
                    handleRecuperar={(correo: string) => {
                        setCorreo(correo);
                        setForm('verificarPassword');
                    }}
                    homeBack={() => setForm('signin')} />

            case "newUser":
                return <CreateAccount handleNewUser={handleNewUser} homeBack={() => setForm('signin')} />

            case "verificarAccount":
                return <IlistracionNewUser correo={correo} homeBack={() => setForm('signin')} />

            case "verificarPassword":
                return <IlustracionRecuperarClave correo={correo} homeBack={() => setForm('signin')} />
        }
    }

    const action = (
        <>
            <div style={{
                display: 'flex', padding: '0.75rem', alignItems: 'center', gap: '0.75rem'
            }}>
                <div style={{
                    display: 'flex', padding: ' 0.5rem', justifyContent: 'center',
                    alignItems: 'center', gap: '0.5rem', borderRadius: '32px', background: 'rgba(209, 67, 67, 0.12)'
                }}>
                    <ErrorIcon color='error' fontSize='small' />

                </div>
                <div style={{ border: '1px solid rgba(16, 24, 64, 0.12)', alignSelf: 'stretch' }} id='divDivider' ></div>
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                    gap: '0.25rem', flex: '1 0 0'
                }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography variant='subtitle2' fontSize={'0.8125rem'} color={"rgba(16, 24, 64, 0.87)"}
                            fontWeight={600}>{msnError.title}</Typography>
                        <IconButton color='primary' onClick={handleClose}>
                            <CloseIcon fontSize='small' color='secondary' />
                        </IconButton>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
                        <Typography variant='body2' width={'17.8125rem'} fontSize={'0.8125rem'}>{msnError.msn}</Typography>
                    </div>


                </div>
            </div>
            <LinearProgress color='error' variant="determinate" value={progress} />
        </>

    );


    return (

        <Grid container gap={'8.625rem'} p={'0rem 8.625rem 0rem 0rem;'} alignItems={'center'} justifyContent={'flex-start'}>
            <Grid item xs={6} sm={6} md={5} lg={4.5} xl={3}>
                <IlustrationLogin />
            </Grid>
            <Grid item xs={6} sm={6} md={5} lg={5} xl={4}>

                <Card sx={{
                    width: '36.25rem', borderRadius: '16px !important', height: '29rem',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}
                    elevation={4}
                >
                    <CardContent sx={{
                        padding: '3rem !important', gap: '1rem !important',
                        display: "flex", justifyContent: 'center',
                        flexDirection: 'column', alignItems: 'center'

                    }}>
                        {formLoad()}
                    </CardContent>
                </Card>

            </Grid>

            {open ? <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Paper sx={{ background: '#FEEBEE', borderRadius: '4px' }} elevation={4}>
                    {action}
                </Paper>
            </Snackbar>
                : null}


        </Grid >

    );
}

