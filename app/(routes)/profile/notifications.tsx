import React from 'react';

import { StyleSheet } from 'react-native';

import { Layout, MiniHeader } from '@/components';

export default function Notification() {
  return (
    <Layout>
      <MiniHeader title={'Уведомления'} />
    </Layout>
  );
}

const styles = StyleSheet.create({});
