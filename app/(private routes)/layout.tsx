import React from 'react';

export default function PrivateLayout({
  children,
  modal, // Сюда Next.js автоматически прокинет папку @modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children} {/* Тут рендерятся твои профиль и заметки */}
      {modal} {/* Тут всплывет модалка, когда нужно */}
    </>
  );
}
