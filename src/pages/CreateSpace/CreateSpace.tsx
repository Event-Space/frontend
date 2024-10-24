import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Input,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useUserStore } from '../../app/store/useUserStore';

export default function CreateSpace() {
  const { isAuthorized } = useUserStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    city: '',
    address: '',
    maxCapacity: '',
    capacity: '',
    description: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For image upload

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file as File);
  };

  const onSubmit = useCallback(async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    const spaceRequest = {
      name: form.title,
      address: form.address,
      location: form.city,
      size: form.capacity,
      maxCapacity: form.maxCapacity,
      baseRentalCost: 0,
    };

    const formData = new FormData();
    formData.append('spaceRequest', JSON.stringify(spaceRequest));
    formData.append('name', form.title);
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://zenuki.kz/api/v1/space', {
        method: 'POST',
        body: formData, // The Content-Type is automatically set to 'multipart/form-data' when using FormData
      });

      if (!response.ok) {
        throw new Error('Failed to create space');
      }

      const data = await response.json();
      console.log('Space created successfully:', data);
      alert('Space created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating space!');
    }
  }, [
    form.address,
    form.capacity,
    form.city,
    form.maxCapacity,
    form.title,
    navigate,
    selectedFile,
  ]);

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);

  return (
    <section className={styles.createSpacePage}>
      <div className="container">
        <Box className={styles.createSpace__wrapper}>
          <Typography
            sx={{
              fontSize: '28px',
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            Create Space
          </Typography>

          <InputLabel
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              color: 'black',
            }}
          >
            Space Title
            <Input
              name="title"
              placeholder="Enter your event title"
              disableUnderline
              sx={{
                padding: '5px 10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
              }}
              value={form.title}
              onChange={handleChange}
            />
          </InputLabel>

          <Box sx={{ display: 'flex', gap: '50px' }}>
            <InputLabel
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                color: 'black',
              }}
            >
              City
              <TextField
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                sx={{ marginTop: '8px' }}
              />
            </InputLabel>

            <InputLabel
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                color: 'black',
              }}
            >
              Address
              <TextField
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                sx={{ marginTop: '8px' }}
              />
            </InputLabel>
          </Box>

          <Box sx={{ display: 'flex', gap: '50px' }}>
            <InputLabel
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                color: 'black',
              }}
            >
              Venue Area
              <TextField
                name="maxCapacity"
                type="number"
                placeholder="Enter max capacity"
                value={form.maxCapacity}
                onChange={handleChange}
                sx={{ marginTop: '8px' }}
              />
            </InputLabel>

            <InputLabel
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                color: 'black',
              }}
            >
              Capacity
              <TextField
                name="capacity"
                placeholder="Enter capacity"
                value={form.capacity}
                onChange={handleChange}
                sx={{ marginTop: '8px' }}
              />
            </InputLabel>
          </Box>

          <Box>
            <Typography
              sx={{ fontSize: '24px', fontWeight: '600', marginTop: '40px' }}
            >
              Space Description
            </Typography>
            <TextareaAutosize
              minRows={6}
              name="description"
              placeholder="Space Description and additional services (entertainers, music, decor, etc.)"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                marginTop: '20px',
                border: '1px solid black',
                borderRadius: '5px',
              }}
              value={form.description}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: '18px', marginTop: '20px' }}>
              Upload Space Image
            </Typography>
            <input type="file" onChange={handleFileChange} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              marginTop: '30px',
              padding: '10px 0',
              backgroundColor: '#7209B7',
            }}
            onClick={onSubmit}
          >
            Create Space
          </Button>
        </Box>
      </div>
    </section>
  );
}
