import { LoadingButton } from '@mui/lab'
import { Box, Typography, TextField, Link, FormControlLabel } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import Checkbox from '@mui/material/Checkbox';
import { useForm } from '../hooks/useLogin'


type tipoForm = "newUser" | "forgetPassword" | "signin";

type props = {
    handleError: (msn: string) => void,
    handleFormShow: (form: tipoForm) => void

}

export const FormularioLogin = ({ handleError, handleFormShow }: props) => {
    const { email, password, onInputChange, errorState, handleSubmit, isLoading } = useForm({ email: '', password: '' }, handleError);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit}
            sx={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '2rem',
                alignSelf: 'stretch'
            }}
        >
            <div id="divTitulo" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem',
                alignSelf: 'stretch'
            }}>
                <Typography
                    variant='h4'
                    fontSize={'1.25rem !important'}
                    fontWeight={600}
                >¡Bienvenido! Accede a tu cuenta</Typography>

                <Typography
                    variant='h6'
                    fontSize={'1rem !important'}
                    fontWeight={600}
                >Ingresa tus credenciales para iniciar sesión</Typography>
            </div>


            <div id='divCampos' style={{
                display: 'flex', width: '25rem',
                flexDirection: 'column', alignItems: 'flex-start',
                gap: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', width: '100%' }}>

                    <TextField
                        error={errorState.email.hasError}
                        helperText={errorState.email.msn}
                        required
                        fullWidth
                        size='small'
                        id="email"
                        onChange={onInputChange}
                        value={email}
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', width: '100%' }}>
                    <TextField
                        error={errorState.password.hasError}
                        helperText={errorState.password.msn}
                        required
                        fullWidth
                        size='small'
                        name="password"
                        label="Contraseña"
                        onChange={onInputChange}
                        value={password}
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <FormControlLabel control={<Checkbox defaultChecked size='small' />} label="Recordar usuario" />
                    <div>
                        <Typography variant="body1"
                            color={'#008BB0'}
                            fontSize={'0.875rem'}
                            fontFamily={'Roboto !important'}
                            sx={{ cursor: 'pointer' }}
                            fontWeight={'140%'}
                            onClick={() => handleFormShow("forgetPassword")}
                        >
                            ¿Olvidaste tu contraseña?
                        </Typography>

                    </div>
                </div>
            </div>

            <div id='divAcciones' style={{
                display: 'flex',
                width: '25rem',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',

            }}>

                <LoadingButton
                    size="medium"
                    type="submit"
                    fullWidth                    
                    loadingPosition="start"
                    variant="contained"
                    startIcon={<LoginIcon />}
                    loading={isLoading}
                >
                    Iniciar Sesión
                </LoadingButton>
                <div style={{ display: "flex", alignItems: 'center', }}>
                    <Typography color={'rgba(16, 24, 64, 0.87);'}
                        fontSize={'1rem'}
                        sx={{ cursor: 'pointer' }}
                        >¿Aún no tienes cuenta?
                    </Typography>

                    <Typography variant="body2"
                        ml={1}
                        color={'#008BB0'}
                        fontSize={'1rem'}                       
                        sx={{ cursor: 'pointer' }}                        
                        onClick={()=>handleFormShow("newUser")}
                    >
                        Regístrate Aquí
                    </Typography>
                </div>

            </div>

        </Box>
    )
}
