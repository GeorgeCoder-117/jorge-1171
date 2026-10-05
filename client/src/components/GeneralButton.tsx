interface GeneralBtnProps {
  name?: string;
  loading: boolean;
  view: string;
}

export const GeneralButton = ({ loading, view }: GeneralBtnProps) => {
  return (
    <button className="btn btn-primary" type="submit" disabled={loading}>
      {loading ? view === "register" ? 'Registrando...' : 'Accediendo...' : view === "register" ? 'Registrarse...' : 'Ingresar'}
    </button>
  );
};
