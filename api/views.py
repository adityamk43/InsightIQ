from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import QA
from .serializers import QASerializer
from account.renderers import UserRenderer
from rest_framework.permissions import IsAuthenticated

import openai
import os

openai.api_key = os.environ.get("OPEN_AI_API_KEY")

# Create your views here.

# QA ViewSet


class generateAnswerView(APIView):
    serializer_class = QASerializer
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        qas = QA.objects.filter(user=request.user)
        serializer = self.serializer_class(qas, many=True)
        # data = [{"q_id": qa.id, "question": qa.question, "answer": qa.answer} for qa in qas]
        return Response(serializer.data)

    def post(self, request):
        '''
        Note that the request.data attribute is a dictionary-like object that contains the parsed request data. To avoid raising a KeyError if the "question" key is missing from the request data, you can use the .get() method instead of indexing the dictionary directly. This will return None if the key is not found, which will cause the if statement to evaluate to False and return a response indicating that the question should not be blank.
        '''
        # Get the user id from the request
        user_id = request.user.id
        # question = request.data["question"]
        question_data = request.data.get("question")
        question=''

        if (question_data[-1] != '?' and question_data[-1] !='.' and question_data[-1]!='!'):
            question = question_data + '?'
        else:
            question=question_data
        
        
        # print(question_data)
        # print(question)

        # Use this to prevent exhausting of openAI api usage for hardcoding answer demo
        # answer = "Hello this backend Response for answer!!"

        # to send Answer generated by openai use this!!
        response = openai.Completion.create(
            model="text-davinci-003",
            # model="text-ada-001",
            prompt=question,
            temperature=0,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop=["."]
        )
        answer = response["choices"][0]["text"].strip()

        if answer == "Unknown" or answer == "" or answer == "unknown":
            answer = "I don't have answer to this particular question or the server maybe down right now or the question contains explicit terms!!"

        if (question):
            # qa = QA()
            # qa.question = question
            # qa.answer = answer
            # qa.save()
            data = {
                'question': question_data,
                'answer': answer,
                'user_id': user_id
            }
            serializer = self.serializer_class(data=data)
            serializer.is_valid(raise_exception=True)
            qa = serializer.save()

        else:
            return Response({"message": "question should not be blank"})

        return Response(self.serializer_class(qa).data)

    def delete(self, request):
        qas = QA.objects.filter(user=request.user)
        '''
        Note that the _ variable in the tuple assignment is used to discard the dictionary containing the count of deleted objects for each model. This is because we are only interested in the count of deleted QA objects, and not the count of deleted objects for other models that may be related to QA.
        
        The delete() method returns a tuple containing two values:

        1.) The first value is the number of objects deleted (an integer).
        2.) The second value is a dictionary containing the count of deleted objects for each model that was affected by the delete operation. The keys in the dictionary are the names of the models, and the values are the counts of deleted objects for each model.
        '''
        deleted_count, _ = qas.delete()
        return Response({"message": f"{deleted_count} QA objects deleted"})
