<template>
    <div class="container main-contents">
        <div v-if="isEmpty">
            <EmptyContent data="채팅" />
        </div>
        <div v-if="!isEmpty">
            <div v-for="chat in chats" v-bind:key="chat.id" v-on:click="enterChat()">
                <div class="row border pt-3 px-2">
                    <p style="text-align:left; word-wrap:break-word">
                        <span class="fs-4">&nbsp;&nbsp;{{ chat.title }}</span
                        ><br />
                        <span class="text-secondary">&nbsp;&nbsp;&nbsp;{{ chat.sub }}</span>
                    </p>

                    <div class="row mb-3">
                        <div class="col-2">
                            <img class="img-full-round" :src="chat.img" />
                        </div>
                        <div class="col-8 d-flex align-items-center">
                            <p style="text-align:left">
                                <button class="me-3 " v-for="ta in chat.tag" v-bind:key="ta.id" style="background-color:#FFC6B4; border-radius:20px">&nbsp;{{ ta }}&nbsp;</button>
                            </p>
                        </div>
                        <div class="col-2 d-flex align-items-center text-big">
                            <span style="text-align:right; width:100%">{{ chat.people }}/30</span>
                        </div>
                    </div>

                    <!--<div class="term"></div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChattingApi from "@/apis/ChattingApi.js";
import EmptyContent from "@/components/error/EmptyContent";

export default {
    name: "ChatPage",
    components: {
        EmptyContent,
    },
    data: () => {
        return {
            chatlist: [],
        };
    },
    created() {
        this.chatlist = ChattingApi.requestChattingList();
    },
    computed: {
        chats() {
            return this.chatlist;
        },
        isEmpty() {
            return !this.chatlist.length;
        },
    },
    methods: {
        enterChat(chatId) {
            console.log(chatId);
        },
    },
};
</script>

<style>
.term {
    width: 100%;
    height: 1em;
    /* background-color: #AAA; */
}
</style>
