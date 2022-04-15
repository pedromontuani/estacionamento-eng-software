import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {useAppSelector} from '../store';
import {
  getRendimentosMensal,
  getRendimentosSemanal,
} from '../store/slices/estacionamento-slice';

const screenWidth = Dimensions.get('window').width;

const RendimentosView: React.FC<{}> = () => {
  const rendimentoMensal = useAppSelector(({estacionamento}) =>
    getRendimentosMensal(estacionamento),
  );

  const rendimentoSemanal = useAppSelector(({estacionamento}) =>
    getRendimentosSemanal(estacionamento),
  );

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text>Rendimento mensal</Text>
        <BarChart
          style={styles.chart}
          data={rendimentoMensal}
          width={screenWidth - 80}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text>Rendimento semanal</Text>
        <BarChart
          style={styles.chart}
          data={rendimentoSemanal}
          width={screenWidth - 80}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 24,
  },
  chartContainer: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 16,
    paddingVertical: 12,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default RendimentosView;
