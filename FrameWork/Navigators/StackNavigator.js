import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Examino } from "../Screens/intro";
import { SignUpPage } from "../Screens/SignUpPage";
import { CreateAccount } from "../Screens/CreateAnAccount";
import { Home, HomePage } from "../Screens/HomePage";
import { ProceedCreateAcct} from "../Screens/proceedAcct";
import { Waec } from "../ExamScreens/Waec";
import { Jamb } from "../ExamScreens/Jamb";
import { Neco } from "../ExamScreens/Neco";
import { MathematicsScreen } from "../Subjects/WaecSubjects/Mathematics";
import { EnglishScreen } from "../Subjects/WaecSubjects/EnglishLanguage";
import { PhysicsScreen } from "../Subjects/WaecSubjects/Physics";
import { BiologyScreen } from "../Subjects/WaecSubjects/Biology";
import { ChemistryScreen } from "../Subjects/WaecSubjects/Chemistry";
import { MathematicsScreenNeco } from "../Subjects/NecoSubjects/MathematicsNeco";
import { EnglishScreenNeco } from "../Subjects/NecoSubjects/EnglishLanguageNeco";
import { PhysicsScreenNeco } from "../Subjects/NecoSubjects/PhysicsNeco";
import { BiologyScreenNeco } from "../Subjects/NecoSubjects/BiologyNeco";
import { ChemistryScreenNeco } from "../Subjects/NecoSubjects/ChemistryNeco.js";
import { MathematicsScreenJamb } from "../Subjects/JambSubjects/MathematicsJamb.js";
import { EnglishScreenJamb } from "../Subjects/JambSubjects/EnglishLanguageJamb.js";
import { PhysicsScreenJamb } from "../Subjects/JambSubjects/PhysicsJamb.js";
import { BiologyScreenJamb } from "../Subjects/JambSubjects/BiologyJamb.js";
import { ChemistryScreenJamb } from "../Subjects/JambSubjects/ChemistryJamb.js";
import { MathematicsExamInfoScreen } from "../Subjects/ExamInfo/MathematicsExamInfo.js";
import { EnglishLanguageExamInfoScreen } from "../Subjects/ExamInfo/EnglishLanguageExamInfo.js";
import { PhysicsExamInfoScreen } from "../Subjects/ExamInfo/PhysicsExamInfo.js";
import { BiologyExamInfoScreen } from "../Subjects/ExamInfo/BiologyExamInfo.js";
import { ChemistryExamInfoScreen } from "../Subjects/ExamInfo/ChemistryExamInfo.js";
import { MathematicsExamInfoScreenJamb } from "../Subjects/ExamInfoJamb/MathematicsExamInfoJamb.js";
import { EnglishLanguageExamInfoScreenJamb } from "../Subjects/ExamInfoJamb/EnglishLanguageExamInfoJamb.js";
import { PhysicsExamInfoScreenJamb } from "../Subjects/ExamInfoJamb/PhysicsExamInfoJamb.js";
import { BiologyExamInfoScreenJamb } from "../Subjects/ExamInfoJamb/BiologyExamInfoJamb.js";
import { ChemistryExamInfoScreenJamb } from "../Subjects/ExamInfoJamb/ChemistryExamInfoJamb.js";
import { MathematicsExamInfoScreenNeco } from "../Subjects/ExamInfoNeco/MathematicsExamInfoNeco.js";
import { EnglishLanguageExamInfoScreenNeco } from "../Subjects/ExamInfoNeco/EnglishLanguageExamInfoNeco.js";
import { PhysicsExamInfoScreenNeco } from "../Subjects/ExamInfoNeco/PhysicsExamInfoNeco.js";
import { BiologyExamInfoScreenNeco } from "../Subjects/ExamInfoNeco/BiologyExamInfoNeco.js";
import { ChemistryExamInfoScreenNeco } from "../Subjects/ExamInfoNeco/ChemistryExamInfoNeco.js";
import { QuestionList } from "../Questions/WaecQuestionBiology/WaecBiologyQuestion1.js";
import { QuestionListChemistry } from "../Questions/WaecQuestionBiology/WaecChemistryQuestions1.js";
import { QuestionListMathematics } from "../Questions/WaecQuestionBiology/WaecMathematicsQuestions.js";
import { QuestionListPhysics } from "../Questions/WaecQuestionBiology/WaecPhysicsQuestions.js";
import { QuestionListEnglishLanguage } from "../Questions/WaecQuestionBiology/WaecEnglishLanguageQuestions.js";
import { JambQuestionListBiology } from "../Questions/JambQuestionsApi/JambBiologyQuestion1.js";
import { JambQuestionListChemistry } from "../Questions/JambQuestionsApi/JambChemistryQuestions1.js";
import { JambQuestionListMathematics } from "../Questions/JambQuestionsApi/JambMathematicsQuestions.js";
import { JambQuestionListPhysics } from "../Questions/JambQuestionsApi/JambPhysicsQuestions.js";
import { JambQuestionListEnglishLanguage } from "../Questions/JambQuestionsApi/JambEnglishLanguageQuestions.js";
import { NecoQuestionListBiology } from "../Questions/NecoQuestionsApi/NecoBiologyQuestion1.js";
import { NecoQuestionListChemistry } from "../Questions/NecoQuestionsApi/NecoChemistryQuestions1.js";
import { NecoQuestionListMathematics } from "../Questions/NecoQuestionsApi/NecoMathematicsQuestions.js";
import { NecoQuestionListPhysics } from "../Questions/NecoQuestionsApi/NecoPhysicsQuestions.js";
import { NecoQuestionListEnglishLanguage } from "../Questions/NecoQuestionsApi/NecoEnglishLanguageQuestions.js";
import { ForgottenPassword } from "../Screens/ForgottenPassword.js";

const Stack = createNativeStackNavigator();

export function StackNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Intro" screenOptions={{headerShown: false}} >
      <Stack.Screen name="Intro" component={Examino} />
      <Stack.Screen name="Sign Up" component={SignUpPage} />
      <Stack.Screen name="DashBoard" component={HomePage} />
      <Stack.Screen name="Create an account" component={CreateAccount} />
      <Stack.Screen name="ProceedCreateAcct" component={ProceedCreateAcct} />
      <Stack.Screen name="Waec" component={Waec} />
      <Stack.Screen name="Jamb" component={Jamb} />
      <Stack.Screen name="Neco" component={Neco} />
      <Stack.Screen name="MathematicsScreen" component={MathematicsScreen} />
      <Stack.Screen name="EnglishScreen" component={EnglishScreen} />
      <Stack.Screen name="PhysicsScreen" component={PhysicsScreen} />
      <Stack.Screen name="BiologyScreen" component={BiologyScreen} />
      <Stack.Screen name="ChemistryScreen" component={ChemistryScreen} />
      <Stack.Screen name="MathematicsScreenJamb" component={MathematicsScreenJamb} />
      <Stack.Screen name="EnglishScreenJamb" component={EnglishScreenJamb} />
      <Stack.Screen name="PhysicsScreenJamb" component={PhysicsScreenJamb} />
      <Stack.Screen name="BiologyScreenJamb" component={BiologyScreenJamb} />
      <Stack.Screen name="ChemistryScreenJamb" component={ChemistryScreenJamb} />
      <Stack.Screen name="MathematicsScreenNeco" component={MathematicsScreenNeco} />
      <Stack.Screen name="EnglishScreenNeco" component={EnglishScreenNeco} />
      <Stack.Screen name="PhysicsScreenNeco" component={PhysicsScreenNeco} />
      <Stack.Screen name="BiologyScreenNeco" component={BiologyScreenNeco} />
      <Stack.Screen name="ChemistryScreenNeco" component={ChemistryScreenNeco} />
      <Stack.Screen name="MathematicsExamInfoScreen" component={MathematicsExamInfoScreen} />
      <Stack.Screen name="EnglishLanguageExamInfoScreen" component={EnglishLanguageExamInfoScreen} />
      <Stack.Screen name="PhysicsExamInfoScreen" component={PhysicsExamInfoScreen} />
      <Stack.Screen name="BiologyExamInfoScreen" component={BiologyExamInfoScreen} />
      <Stack.Screen name="ChemistryExamInfoScreen" component={ChemistryExamInfoScreen} />
      <Stack.Screen name="MathematicsExamInfoScreenNeco" component={MathematicsExamInfoScreenNeco} />
      <Stack.Screen name="EnglishLanguageExamInfoScreenNeco" component={EnglishLanguageExamInfoScreenNeco} />
      <Stack.Screen name="PhysicsExamInfoScreenNeco" component={PhysicsExamInfoScreenNeco} />
      <Stack.Screen name="BiologyExamInfoScreenNeco" component={BiologyExamInfoScreenNeco} />
      <Stack.Screen name="ChemistryExamInfoScreenNeco" component={ChemistryExamInfoScreenNeco} />
      <Stack.Screen name="MathematicsExamInfoScreenJamb" component={MathematicsExamInfoScreenJamb} />
      <Stack.Screen name="EnglishLanguageExamInfoScreenJamb" component={EnglishLanguageExamInfoScreenJamb} />
      <Stack.Screen name="PhysicsExamInfoScreenJamb" component={PhysicsExamInfoScreenJamb} />
      <Stack.Screen name="BiologyExamInfoScreenJamb" component={BiologyExamInfoScreenJamb} />
      <Stack.Screen name="ChemistryExamInfoScreenJamb" component={ChemistryExamInfoScreenJamb} />
      <Stack.Screen name="questionlist" component={QuestionList} />
      <Stack.Screen name="questionlistChemistryWaec" component={QuestionListChemistry} />
      <Stack.Screen name="questionlistMathematicsWaec" component={QuestionListMathematics} />
      <Stack.Screen name="questionlistPhysicsWaec" component={QuestionListPhysics} />
      <Stack.Screen name="questionlistEnglishLanguageWaec" component={QuestionListEnglishLanguage} />
      
      <Stack.Screen name="questionlistBiology" component={JambQuestionListBiology} />
      <Stack.Screen name="JambquestionlistChemistry" component={JambQuestionListChemistry} />
      <Stack.Screen name="JambquestionlistMathematics" component={JambQuestionListMathematics} />
      <Stack.Screen name="JambquestionlistPhysics" component={JambQuestionListPhysics} />
      <Stack.Screen name="JambquestionlistEnglishLanguage" component={JambQuestionListEnglishLanguage} />
      
      <Stack.Screen name="NecoquestionlistBiology" component={NecoQuestionListBiology} />
      <Stack.Screen name="NecoquestionlistChemistry" component={NecoQuestionListChemistry} />
      <Stack.Screen name="NecoquestionlistMathematics" component={NecoQuestionListMathematics} />
      <Stack.Screen name="NecoquestionlistPhysics" component={NecoQuestionListPhysics} />
      <Stack.Screen name="NecoquestionlistEnglishLanguage" component={NecoQuestionListEnglishLanguage} />
      <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} />
      
    </Stack.Navigator>
    </NavigationContainer>
  );
}

