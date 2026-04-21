import React from 'react';

export default function PrivateLayout({
  children,
  modal, // Пропс для папки @modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
