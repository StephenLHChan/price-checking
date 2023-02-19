import axios from 'axios';
import { useState } from 'react';

import { Button, Grid, TextField } from '@mui/material';

import FormButtonsContainer from '../components/formButtonsContainer';
import FormContainer from '../components/formContainer';
import FormInputFieldContainer from '../components/formInputFieldContainer';
import PageTitle from '../components/pageTitle';

const CreateBrand = () => {
  const [brandName, setBrandName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [logo, setLogo] = useState<string>('');

  const getBrandNames = async () => {
    try {
      const { data } = await axios.get('/api/brands');
      const brandNames: Array<string> = data.map((brand: { name: string }) => brand.name);
      return brandNames;
    } catch (err) {
      console.error(err);
    }
  };

  const saveBrands = async (body: { name: string; description: string; website: string; logo: string }) => {
    const { data } = await axios.post('/api/brands', body);
    return data;
  };

  const handleSubmitOnClick = async () => {
    if (!brandName) {
      alert('Error');
      return;
    }
    const newBrand = { name: brandName, description, website, logo };
    const existingBrandNames = await getBrandNames();
    if (existingBrandNames?.includes(newBrand.name)) {
      alert('Error: The brand name already exists');
      return;
    }
    await saveBrands(newBrand);
    setBrandName('');
    setDescription('');
    setWebsite('');
    setLogo('');
  };

  const handleCancelOnClick = () => {
    setBrandName('');
    setDescription('');
    setWebsite('');
    setLogo('');
  };

  return (
    <>
      <PageTitle title="Create Brand" />
      <FormContainer>
        <FormInputFieldContainer>
          <Grid container spacing={5}>
            <Grid container item spacing={3}>
              <TextField
                required
                label="Brand Name"
                value={brandName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBrandName(event.target.value)}
              />
            </Grid>
            <Grid container item spacing={3}>
              <TextField
                label="Descriptions"
                multiline
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid container item spacing={3}>
              <TextField label="Website" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </Grid>
            <Grid container item spacing={3}>
              <TextField label="Logo" value={logo} onChange={(event) => setLogo(event.target.value)} />
            </Grid>
          </Grid>
        </FormInputFieldContainer>

        <FormButtonsContainer>
          <Button variant="outlined" onClick={handleSubmitOnClick}>
            Submit
          </Button>
          <Button variant="outlined" onClick={handleCancelOnClick}>
            Cancel
          </Button>
        </FormButtonsContainer>
      </FormContainer>
    </>
  );
};

export default CreateBrand;
