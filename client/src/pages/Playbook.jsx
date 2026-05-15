import Layout from '../components/Layout';
import Chapter4Playbook from '../chapters/Chapter4Playbook';

export default function Playbook() {
  return (
    <Layout currentStep={1}>
      <Chapter4Playbook />
    </Layout>
  );
}
