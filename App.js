import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Picker } from "react-native";

const ColisaoSimulador = () => {
  const [velocidade1, setVelocidade1] = useState("");
  const [velocidade2, setVelocidade2] = useState("");
  const [sentido, setSentido] = useState("mesmo");
  const [forcaImpacto, setForcaImpacto] = useState("");
  const [quilogramasEquivalentes, setQuilogramasEquivalentes] = useState("");

  const simularColisao = () => {
    function newtonsToKilogramaForca(newtons) {
      const kgfConversionFactor =0.1019716213;
      const kgf = newtons * kgfConversionFactor;
      return kgf;
    }

    // Validar se as entradas de velocidade são numéricas
    if (isNaN(parseFloat(velocidade1)) || isNaN(parseFloat(velocidade2))) {
      alert("Por favor, insira valores numéricos para as velocidades.");
      return;
    }

    // Lógica para calcular a força do impacto e os quilogramas equivalentes
    // Aqui você pode implementar a fórmula que desejar para a simulação

    // Exemplo simples: força = massa * aceleração
    const massa1 = 1; // Massa do corpo 1 em kg
    const massa2 = 1; // Massa do corpo 2 em kg

    // Converter as entradas de string para números e ajustar para metros por segundo (m/s)
    const v1 = (parseFloat(velocidade1) * 1000) / 3600; // Converter km/h para m/s
    const v2 = (parseFloat(velocidade2) * 1000) / 3600; // Converter km/h para m/s

    // Calcular a variação de velocidade
    const deltaV = sentido === "mesmo" ? v2 - v1 : v2 + v1;

    // Calcular a força do impacto
    const forca = massa1 * deltaV;

    setForcaImpacto(Math.abs(forca).toFixed(2)); // Usar Math.abs para garantir que seja positivo

    setQuilogramasEquivalentes(newtonsToKilogramaForca(Math.abs(forca)).toFixed(3)); // Usar Math.abs para garantir que seja positivo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Colisões</Text>
      <TextInput
        style={styles.input}
        placeholder="Velocidade Corpo 1 (km/h)"
        value={velocidade1}
        onChangeText={(text) => setVelocidade1(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Velocidade Corpo 2 (km/h)"
        value={velocidade2}
        onChangeText={(text) => setVelocidade2(text)}
        keyboardType="numeric"
      />
      <Picker
        style={styles.input}
        selectedValue={sentido}
        onValueChange={(itemValue) => setSentido(itemValue)}
      >
        <Picker.Item label="Mesmo sentido" value="mesmo" />
        <Picker.Item label="Sentidos opostos" value="oposto" />
      </Picker>
      <Button title="Simular Colisão" onPress={simularColisao} />
      {forcaImpacto && (
        <Text style={styles.result}>Força do Impacto: {forcaImpacto} N</Text>
      )}
      {quilogramasEquivalentes && (
        <Text style={styles.result}>
          Quilogramas Equivalentes: {quilogramasEquivalentes} kgf
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    width: "100%",
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ColisaoSimulador;
