import { Button } from '@mui/material';
import React, { useState } from 'react';

export function CreateDoctorForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="contained">Создать</Button>
    </div>
  );
}
