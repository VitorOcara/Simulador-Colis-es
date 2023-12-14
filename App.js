import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Picker,
  Pressable,
} from "react-native";

const ColisaoSimulador = () => {
  const [velocidade1, setVelocidade1] = useState("");
  const [velocidade2, setVelocidade2] = useState("");
  const [massa1, setMassa1] = useState();
  const [massa2, setMassa2] = useState();
  const [naFrente, setNaFrente] = useState("corpo1");
  const [deltaV, setDeltaV] = useState();

  const [tempoC, setTempoC] = useState();

  const [sentido, setSentido] = useState("mesmo");
  const [forcaImpacto, setForcaImpacto] = useState("");
  const [quilogramasEquivalentes, setQuilogramasEquivalentes] = useState("");

  const newtonsToKilogramaForca = (newtons) => {
    const kgfConversionFactor = 0.1019716213;
    const kgf = newtons * kgfConversionFactor;
    return kgf;
  };

  const validar = () => {
    if (naFrente === "corpo1") {
      return velocidade1 > velocidade2 ? false : true;
    } else {
      return velocidade1 > velocidade2 ? true : false;
    }
  };

  const calcularForca = () => {
    let v1 = velocidade1 / 3.6;
    let v2 = velocidade2 / 3.6;
    let m1 = massa1 / 9.8;
    let m2 = massa2 / 9.8;

    let Pi = sentido === "mesmo" ? m1 * v1 - m2 * v2 : m1 * v1 + m2 * v2;

    const forca = Pi / tempoC;

    setForcaImpacto(Math.abs(forca).toFixed(2)); // Usar Math.abs para garantir que seja positivo

    setQuilogramasEquivalentes(
      newtonsToKilogramaForca(Math.abs(forca)).toFixed(3)
    );
  };

  const simularColisao = () => {
    // Validar se as entradas de velocidade são numéricas
    if (
      isNaN(parseFloat(velocidade1)) ||
      isNaN(parseFloat(velocidade2)) ||
      isNaN(parseFloat(massa2)) ||
      isNaN(parseFloat(massa1))
    ) {
      alert("Por favor, insira valores numéricos para as velocidades e pesos.");
      return;
    }

    const v1 = (parseFloat(velocidade1) * 1000) / 3600; // Converter km/h para m/s
    const v2 = (parseFloat(velocidade2) * 1000) / 3600; // Converter km/h para m/s

    // Calcular a variação de velocidade

    if (sentido === "mesmo") {
      validar() === false ? setForcaImpacto("0") : calcularForca();
    } else {
      calcularForca();
    }
    // Usar Math.abs para garantir que seja positivo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Calculador de Força de Colisões Inelásticas entre 2 corpos
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Massa do Corpo 1 (kg)"
        value={massa1}
        onChangeText={(text) => setMassa1(text)}
        inputMode="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Massa do corpo 2 (kg)"
        value={massa2}
        onChangeText={(text) => setMassa2(text)}
        inputMode="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Velocidade Corpo 1 (km/h)"
        value={velocidade1}
        onChangeText={(text) => setVelocidade1(text)}
        inputMode="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Velocidade Corpo 2 (km/h)"
        value={velocidade2}
        onChangeText={(text) => setVelocidade2(text)}
        inputMode="numeric"
      />
      <TextInput
        style={styles.input}
        inputMode="numeric"
        placeholder="Tempo de colisão em segundos"
        value={tempoC}
        onChangeText={(text) => setTempoC(text)}
      />
      <Picker
        style={styles.input}
        selectedValue={sentido}
        onValueChange={(itemValue) => setSentido(itemValue)}
      >
        <Picker.Item label="Mesmo sentido" value="mesmo" />
        <Picker.Item label="Sentidos opostos" value="oposto" />
      </Picker>

      <Text>Corpo que está na frente: </Text>
      <Picker
        style={styles.input}
        selectedValue={naFrente}
        onValueChange={(itemValue) => setNaFrente(itemValue)}
      >
        <Picker.Item label="Corpo 1" value="corpo1" />
        <Picker.Item label="Corpo 2" value="corpo2" />
      </Picker>

      <Pressable style={styles.button} onPress={simularColisao}>
        <Text style={styles.textBranco}>Simular Colisão</Text>
      </Pressable>
      {forcaImpacto && (
        <Text style={styles.result}>Momento linear: {forcaImpacto} kgm/s</Text>
      )}
      {forcaImpacto && (
        <Text style={styles.result}>
          {" "}
          Força em {tempoC.toString()} segundos:{" "}
          {(forcaImpacto / tempoC).toFixed(2)} N
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
  button: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  textBranco: {
    color: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    marginTop: 4,
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
