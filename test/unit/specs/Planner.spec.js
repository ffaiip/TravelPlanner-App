import Vue from 'vue';
import Planner from '@/components/Planner';
import { mount } from 'avoriaz';

describe('Planner.vue', () => {
  it('add a new item to list on click', () => {

    const listComponent = mount(Planner);

    ListComponent.setData({
        avatar: "https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising",
        time: '2',
        name: 'CentralWorld',
        spendtime: '3',
        completed: false}
    );

    const button = ListComponent.find('button')[0];
    button.dispatch('click')

    expect(listComponent.text()).to.contain({avatar: "https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising",
    time: '2',
    name: 'CentralWorld',
    spendtime: '3',
    completed: false});

    expect(listComponent.data().list).to.contain({avatar: "https://static1.squarespace.com/static/5572b7b4e4b0a20071d407d4/t/58a32d06d482e9d74eecebe4/1487751950104/Location+Based+Mobile-+Advertising",
    time: '2',
    name: 'CentralWorld',
    spendtime: '3',
    completed: false});

  });
});