import React from 'react';

import { Divider, Layout, MiniHeader, Text } from '@/components';
import { ScrollView } from 'react-native';

export default function Orders() {
  return (
    <Layout>
      <MiniHeader title={'Ваши заказы'} />
      <ScrollView>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
          corporis incidunt suscipit. Veritatis vero molestias minus sit
          obcaecati illo rerum fuga eveniet, veniam, ratione itaque repellat
          nisi, quisquam hic officiis dolore incidunt blanditiis culpa corporis
          dignissimos! Amet consequatur iste consequuntur similique, ullam unde
          exercitationem quidem perspiciatis nobis doloremque mollitia tenetur,
          inventore at praesentium nisi neque sint, provident labore cum aperiam
          quas adipisci. Officia eveniet distinctio dicta aliquid iusto
          blanditiis soluta.
        </Text>
        <Divider />
        <Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam dolorem
          unde a debitis culpa sit neque placeat praesentium impedit! Cum minus
          maxime, commodi quo neque magni iusto voluptas totam accusantium
          porro, dolorem laborum nisi quis assumenda optio dolore ad blanditiis
          odio hic obcaecati ipsa. Cupiditate soluta perspiciatis doloremque
          sint. Aliquid?
        </Text>
      </ScrollView>
    </Layout>
  );
}
