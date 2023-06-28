import { propsNewAccount, useCreateAccount } from '../Hook/useCreateAccount'
import { Typography, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Radio, RadioGroup, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



export const CreateAccount = ({ handleNewUser, homeBack }: propsNewAccount) => {

    const { errorState, formState, hadleSubmit, onChangeFrm, handleCheckedTP, handleChangeTipoDoc, loading } = useCreateAccount({ handleNewUser, homeBack });
    return (
        <>
            <div id='DivTitulo' style={{
                display: 'flex', flexDirection: 'column',

                alignItems: 'center', gap: '1rem', alignSelf: "stretch"
            }}>

                <Typography variant='h4' color="rgba(16, 24, 64, 0.87)" fontSize={"1.25rem"}
                    fontWeight={600} fontFamily={"Nunito !important"}
                >¡Bienvenido! Regístrate ahora</Typography>

                <Typography variant='h6' color="rgba(16, 24, 64, 0.87)" fontSize={"0.94rem"}
                    fontWeight={600} fontFamily={"Nunito !important"}
                >Completa la información correspondiente para crear un nuevo usuario</Typography>

            </div>

            <div id='DivRadios' style={{
                display: 'flex', padding: '1rem', alignItems: 'center', gap: '1.1875rem', alignSelf: "stretch",
                borderRadius: "4px", background: "rgba(30, 98, 161, 0.04)"
            }}>

                <div id='DivtipoPersona' style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>

                    <AccountCircleIcon fontSize='small' sx={{ gap: "0.625rem" ,color:'text.primary'}} />

                    <Typography variant='subtitle1'
                        fontSize={'0.875rem'} color="text.primary"
                        fontWeight={500}
                    >Tipo de persona: </Typography>
                </div>
                <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel
                        value="female" control={<Radio size='small' />}
                        label="Natural"
                        checked={formState.TipoPersona == 'N'}
                        onClick={() => { handleCheckedTP("N") }} />
                    <FormControlLabel value="male" control={<Radio size='small' />}
                        label="Jurídica"
                        checked={formState.TipoPersona != 'N'}
                        onClick={() => { handleCheckedTP("J") }} />

                </RadioGroup>

            </div>



            <div id='DivCampos' style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.75rem',
                alignSelf: 'stretch'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    alignSelf: 'stretch'
                }}>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo de documento</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="tipoDocumento"
                            value={formState.TipoPersona != 'N' ? "NIT" : formState.tipoDocumento}
                            label="Tipo documento"
                            onChange={(e) => { handleChangeTipoDoc("tipoDocumento", e.target.value as string) }}
                            size='small'
                            disabled={formState.TipoPersona != 'N'}
                        >
                            <MenuItem value={"CC"}>CC - Cédula de ciudadanía</MenuItem>
                            {
                                formState.TipoPersona != 'N'
                                    ? <MenuItem value={"NIT"}>NIT - Número identificación tributaria</MenuItem>
                                    : null
                            }
                            <MenuItem value={"CE"}>CE - Cédula de extrangería</MenuItem>
                            <MenuItem value={"TI"}>PA - Pasaporte</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        error={errorState.documento.hasError}
                        helperText={errorState.documento.msn}
                        required
                        fullWidth
                        id="documento"
                        onChange={onChangeFrm}
                        value={formState.documento}
                        label="Número de documento"
                        name="documento"
                        autoComplete="Documento"
                        type='number'
                    />

                    {formState.TipoPersona == 'J'
                        ?
                        <TextField
                            size="small"
                            required
                            sx={{ width: '100px' }}
                            id="digito"
                            disabled
                            value={formState.codigoVerificacion}
                            label=""
                            name="codigoVerificacion"
                        />

                        : null}

                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    alignSelf: 'stretch'
                }}>

                    {
                        formState.TipoPersona == 'N'
                            ? <>
                                <TextField
                                    size="small"
                                    error={errorState.Nombres.hasError}
                                    helperText={errorState.Nombres.msn}
                                    required
                                    fullWidth
                                    id="nombre"
                                    onChange={onChangeFrm}
                                    value={formState.Nombres}
                                    label="Nombres"
                                    name="Nombres"
                                    autoComplete="Nombres"
                                />
                                <TextField
                                    size="small"
                                    error={errorState.Apellidos.hasError}
                                    helperText={errorState.Apellidos.msn}
                                    required
                                    fullWidth
                                    id="apellidos"
                                    onChange={onChangeFrm}
                                    value={formState.Apellidos}
                                    label="Apellidos"
                                    name="Apellidos"
                                    autoComplete="apellidos"
                                />
                            </>
                            : <TextField
                                size="small"
                                error={errorState.Nombres.hasError}
                                helperText={errorState.Nombres.msn}
                                required
                                fullWidth
                                id="nombre"
                                onChange={onChangeFrm}
                                value={formState.Nombres}
                                label="Nombre empresa"
                                name="Nombres"
                            />
                    }

                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    alignSelf: 'stretch'
                }}>

                    <TextField
                        size="small"
                        error={errorState.correo.hasError}
                        helperText={errorState.correo.msn}
                        required
                        fullWidth
                        id="correo"
                        onChange={onChangeFrm}
                        value={formState.correo}
                        label="Correo electrónico"
                        name="correo"
                        autoComplete="correo"
                    />

                    <TextField
                        size="small"
                        error={errorState.ConfirmaCorreo.hasError}
                        helperText={errorState.ConfirmaCorreo.msn}
                        required
                        fullWidth
                        id="correo"
                        onChange={onChangeFrm}
                        value={formState.confirmaCorreo}
                        label="Confirmación correo electrónico"
                        name="confirmaCorreo"
                        autoComplete="Confirmación correo electrónico"
                    />
                </div>

            </div>


            <div id="DivAcciones" style={{
                
                display: 'flex',
                width: '100%',
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
                    onClick={() => { hadleSubmit() }}
                    startIcon={<PersonAddAltOutlinedIcon />}
                    loading={loading}
                >
                    Crear usuario
                </LoadingButton>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant='h6' color="rgba(16, 24, 64, 0.87)"
                        fontSize={"1rem"} >
                        ¿Ya tienes cuenta?
                    </Typography>
                    <Typography variant='h6' color="#008BB0"
                        onClick={homeBack}
                        pl={1}
                        fontSize={"1rem"} sx={{ cursor: 'pointer' }}>
                        Ingresa Aquí
                    </Typography>
                </div>
            </div>

        </>
    )
}
export default CreateAccount;