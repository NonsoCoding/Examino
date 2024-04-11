import React, { useEffect, useState } from "react";
import { StatusBar, Platform, TouchableOpacity, Button } from "react-native";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { Theme } from "../../components/Theme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function NecoQuestionListMathematics({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true); // Define the loading state variable
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to store the index of the current question
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setCorrectAnswers(0); // Reset correctAnswers
      setCurrentQuestionIndex(0); // Reset currentQuestionIndex
      setSelectedOption(null); // Reset selectedOption

      let fetchedQuestions = [];
      let currentPage = 1;
      while (fetchedQuestions.length < 5) {
        const response = await fetch(
          `https://questions.aloc.com.ng/api/v2/q?subject=mathematics&type=neco&page=${currentPage}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              AccessToken: "QB-2e0adc015216a0af2e9c",
            },
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }
        const responseData = await response.json();
        const data = responseData.data;
        fetchedQuestions.push(data);
        currentPage++;
        console.log("data: ", data);
      }
      setQuestions(fetchedQuestions.flat().slice(0, 5)); // Flatten the array and slice to ensure we have exactly 5 questions
      setLoading(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const correctAnswer = questions[currentQuestionIndex].answer;
    if (option === correctAnswer.toLowerCase()) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setCurrentQuestionIndex(-1); // Set currentQuestionIndex to -1 when all questions are answered
    }
  };

  const gradeUser = () => {
    const percentage = (correctAnswers / questions.length) * 100;

    alert(
      `you got ${correctAnswers} out of ${
        questions.length
      } questions right. your percentage is ${percentage.toFixed(2)}%.`
    );
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <TouchableOpacity
        style={{ paddingLeft: 20, flexDirection: "row", alignItems: "center" }}
        onPress={() => navigation.navigate("MathematicsExamInfoScreenNeco")}
      >
        <MaterialCommunityIcons name="ray-end-arrow" size={40} />
        <Text style={{ fontFamily: Theme.fonts.text900 }}>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : currentQuestionIndex === -1 ? (
          <View style={styles.gradeContainer}>
            <View
              style={{
                borderRadius: 125,
                padding: 10,
                borderWidth: 1,
                height: 250,
                width: 250,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                borderColor: "white",
              }}
            >
              <Text style={[styles.gradeText, { color: "white" }]}>
                Your percentage is{" "}
              </Text>
              <Text
                style={{
                  fontFamily: Theme.fonts.text900,
                  fontSize: 19,
                  color: "white",
                }}
              >
                {((correctAnswers / questions.length) * 100).toFixed(2)}%
              </Text>
            </View>
            <Text style={styles.gradeText}>
              Congratulations you got {correctAnswers} out of {questions.length}{" "}
              questions right.
            </Text>
            <TouchableOpacity
              style={styles.gradeButton}
              onPress={fetchQuestions}
            >
              <Text style={styles.gradeButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : questions.length === 0 ? (
          <Text style={styles.errorText}>No questions available.</Text>
        ) : questions[currentQuestionIndex] ? (
          <>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {questions[currentQuestionIndex].question}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Exam Type: ssce examination</Text>
                <Text>
                  , Exam Year: {questions[currentQuestionIndex].examyear}
                </Text>
              </View>
              {questions[currentQuestionIndex].image !== "" && (
                <Image
                  style={styles.image} // Add styles for image size and alignment
                  source={{ uri: questions[currentQuestionIndex].image }} // Provide the image URL
                />
              )}
              {/* Render the solution if it exists */}
              {questions[currentQuestionIndex].solution && (
                <View>
                  <Text style={styles.solutionText}>Solution:</Text>
                  <Text>{questions[currentQuestionIndex].solution}</Text>
                </View>
              )}
            </View>
            <View style={styles.optionsContainer}>
              {["a", "b", "c", "d", "e"].map((optionKey) => (
                <TouchableOpacity
                  key={optionKey}
                  onPress={() => handleOptionSelect(optionKey)}
                  style={[
                    styles.optionButton,
                    selectedOption === optionKey && styles.selectedOption,
                  ]}
                >
                  <Text style={styles.optionText}>
                    {`${optionKey.toUpperCase()}. ${
                      questions[currentQuestionIndex].option[optionKey]
                    } `}
                    {selectedOption === optionKey && (
                      <FontAwesome5
                        name="check-circle"
                        size={20}
                        color="green"
                        style={{ marginLeft: 5 }}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button
              title="Next"
              onPress={handleNextQuestion}
              disabled={selectedOption === null}
            />
            <Button
              title="Previous"
              onPress={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            />
          </>
        ) : (
          <Text style={styles.errorText}>Question data not available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
// Styles...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Theme.colors.primary,
  },
  questionContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6, // This is for Android shadow
  },
  questionText: {
    fontSize: 15,
    fontFamily: Theme.fonts.text500,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    fontFamily: Theme.fonts.text700,
  },
  optionsContainer: {
    padding: 2,
    paddingTop: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
    borderColor: "#ccc",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  optionText: {
    fontFamily: Theme.fonts.text500,
    fontSize: 17,
  },
  selectedOption: {
    borderColor: "green",
  },
  gradeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradeText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: Theme.fonts.text800,
  },
  gradeButton: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginBottom: 10,
  },
  gradeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: Theme.fonts.text800,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  solutionText: {
    fontFamily: Theme.fonts.text900,
  },
});
